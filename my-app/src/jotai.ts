export function atom<AtomType>(initialValue: AtomType):{
    get:()=>AtomType;
    set:(newValue:AtomType)=>void;
    subscribe:(callback:(newValue:AtomType)=>void)=>()=>void
}{
    let value=initialValue;
    const subscribers= new Set<(newValue:AtomType)=>void>();
    return{
        get:()=>value,
        set:(newValue)=>{
            value=newValue 
            subscribers.forEach((callback)=>callback(value))
        },
        subscribe:(callback)=>{
            subscribers.add(callback);
        
        return ()=>{
            subscribers.delete(callback);
        }}
    }
}

export function useAtom(){
    
}