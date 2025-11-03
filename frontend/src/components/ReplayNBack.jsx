import Back from "./Back"
import Restart from "./Restart"
function ReplayNBack(){

  return(<>
  <div className="flex justify-between w-100 ">
      <div>
        <Back/>
      </div>
      <div>
        <Restart/>  
      </div>
    </div>
  </>
    
  )

}
export default ReplayNBack