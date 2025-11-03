import { useState, useEffect, useRef } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import bg from "../assets/Color/Medium/bg.webp";
import ReplayNBack from "./ReplayNBack";
import api from "../api";

// 🧩 Draggable item component
function Draggable({ id, img, x, y }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    position: "absolute",
    left: x,
    top: y,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
    touchAction: "none", // Prevent weird dragging on touch devices
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img src={img} alt={id} className="h-[100px] select-none" draggable="false" />
    </div>
  );
}

// 🧩 Droppable jar component
function Droppable({ id, placedItems, jarImg }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = { opacity: isOver ? "0.8" : "1" };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative flex items-end justify-center h-[300px] w-[200px]"
    >
      <img src={jarImg} alt={`${id} jar`} className="absolute h-[260px] w-[160px]" />
      <div className="flex flex-wrap gap-2 mb-10 z-10">
        {placedItems.map((item) => (
          <img key={item.id} src={item.img} alt={item.type} className="h-[50px]" />
        ))}
      </div>
    </div>
  );
}

// 🧩 Main sorting game
function SortingGame({ itemsData, jars, starImages, gamelevel }) {
  const [items, setItems] = useState(itemsData);
  const [dropped, setDropped] = useState(Object.fromEntries(jars.map((jar) => [jar.id, []])));
  const [count, setCount] = useState(1);

  const selectedChild = JSON.parse(localStorage.getItem("selectedChild"));
  const childId = selectedChild?.id;
  const level = gamelevel;

  const containerRef = useRef(null);

  // 🕹 Handle item dropping
  function handleDragEnd(event) {
    if (event.over) {
      const draggedId = event.active.id;
      const droppedId = event.over.id;
      const draggedItem = items.find((it) => it.id === draggedId);

      if (!draggedItem) return;
      if (draggedItem.correctJar !== droppedId) return;

      setDropped((prev) => ({
        ...prev,
        [droppedId]: [...prev[droppedId], draggedItem],
      }));

      setItems((prev) => prev.filter((it) => it.id !== draggedId));
    }
  }

  const isGameFinished = items.length === 0;

  // ⏱ Timer
  useEffect(() => {
    if (isGameFinished) return;
    const interval = setInterval(() => setCount((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isGameFinished]);

  // 💾 Save progress when finished
  useEffect(() => {
    if (!isGameFinished || !childId) return;

    const data = {
      child_id: childId,
      game: "Color",
      difficulty: "Medium",
      level: level,
      time: count,
    };

    console.log("Saving progress:", data);

    api
      .post("/api/save_progress/", data)
      .then((res) => console.log("Progress saved:", res.data))
      .catch((err) => console.error("Error saving progress:", err));
  }, [isGameFinished]);

  // ⭐ Star result display logic
  const getStarImage = () => {
    if (count <= 15) return starImages.three;
    if (count <= 20) return starImages.two;
    return starImages.one;
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center h-[100vh] w-full font-[coiny] overflow-hidden bg-no-repeat bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Timer */}
      <div className="absolute top-2 right-4 text-xl text-black">
        Time: {count}s
      </div>

      {/* DnD Context with movement restriction */}
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
       modifiers={[restrictToWindowEdges]} 
      >
        {/* Draggable items */}
        {items.map((item) => (
          <Draggable
            key={item.id}
            id={item.id}
            img={item.img}
            x={item.x}
            y={item.y}
          />
        ))}

        {/* Jars (droppables) */}
        <div className="flex absolute bottom-5 gap-10">
          {jars.map((jar) => (
            <Droppable
              key={jar.id}
              id={jar.id}
              placedItems={dropped[jar.id]}
              jarImg={jar.img}
            />
          ))}
        </div>
      </DndContext>

      {/* Results overlay */}
      {isGameFinished && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
          <img
            src={getStarImage()}
            alt="Game Completed!"
            className="h-[300px] animate-bounce"
          />
          <div className="absolute bottom-[20%]">
            <ReplayNBack />
          </div>
        </div>
      )}
    </div>
  );
}

export default SortingGame;
