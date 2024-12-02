import { useState, useEffect } from "react";

const useOnSeen = (reference, rootMargin = "0px") => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting);
            },
            { rootMargin, threshold: 0 }
        );
    
        if (reference.current) {
            observer.observe(reference.current);
    
            // Forzar una evaluación inicial
            if (reference.current.getBoundingClientRect().top < window.innerHeight) {
                setIntersecting(true);
            }
        }
    
        return () => {
            if (reference.current) observer.unobserve(reference.current);
        };
    }, [reference, rootMargin]);

    return isIntersecting;
};

export default useOnSeen;
