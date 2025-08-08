export const SnapIndicator = ({ side }) => {
    const styles = {
        top: "top-0 left-0 w-full h-10",
        bottom: "bottom-0 left-0 w-full h-10",
        left: "left-0 top-0 w-10 h-full",
        right: "right-0 top-0 w-10 h-full",
    };

    return <div className={`absolute bg-blue-400 opacity-20 z-50 ${styles[side]}`} />;
};
