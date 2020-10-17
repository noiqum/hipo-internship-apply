export const moveUp = {
    animate: {
        y: -30,
        opacity: 1,
        transition: {
            duration: 1.5,
            ease: "easeInOut",
            durationDelay: 6
        }
    },
    initial: {
        opacity: 0
    },
    exit: {
        y: -20,
        opacity: 0,
        transition: {
            duration: 2,
            ease: "easeIn"
        }
    }

}