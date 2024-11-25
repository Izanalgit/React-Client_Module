import { useState, useEffect } from "react";

const useOnSeen = (reference, rootMargin = "0px") => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {setIntersecting(entry.isIntersecting)},{ rootMargin }
        );

        if (reference.current) 
            observer.observe(reference.current);
        
        return () => {
            if (reference.current)
                observer.unobserve(reference.current);
        };
    }, [reference, rootMargin]);

    return isIntersecting;
};

export default useOnSeen;
