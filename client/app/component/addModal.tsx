'use client'

type propType ={
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const AddModal: React.FC<propType> = ({open, onClose, children}) => {
    return (
        <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}    >
         <div className={`bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
          onClick={(e) => {e.stopPropagation()}}>
            <button className="h-12 w-20 bg-red-600" onClick={onClose}>x</button>
            {children}
            </div>   
        </div>
    );
}
export default AddModal;