interface MainHeadingProps {
    title: string,
}

const MainHeading: React.FC<MainHeadingProps> = ({
    title
}) => {
    return (
        <div id="component_MainHeading">
            <h1 className="text-4xl font-bold antialiased tracking-tighter">{title}</h1>
        </div>
    );
}
 
export default MainHeading;