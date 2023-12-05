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
         <div className={`relative bg-[#44475A] w-1/3 h-1/3 border-2 border-purple-700 rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
          onClick={(e) => {e.stopPropagation()}}>
            <button className="absolute right-2 top-2 h-8 w-8 bg-purple-600 rounded-lg text-2xl" onClick={onClose}>x</button>
            {children}
            </div>   
        </div>
    );
}
export default AddModal;