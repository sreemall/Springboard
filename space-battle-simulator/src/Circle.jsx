import "./Circle.css"

export default function Circle ({btnType, processAttack}) {
    //console.log ("In Circle btyType= ", btnType);
    return (
        <>
            <div onClick={()=>processAttack ()} className={`circle-${btnType}`}> {
                    ((btnType === "Fire") && `${btnType}!`) ||
                    ((btnType === "Restart") && `${btnType}?`)
                    }
            </div>
        </>
    )
}