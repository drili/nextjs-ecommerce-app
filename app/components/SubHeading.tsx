"use client"

interface SubHeadingProps {
    description: string,
}

const SubHeading: React.FC<SubHeadingProps> = ({
    description
}) => {
    return (
        <div id="component_SubHeading">
            <h2 className="text-lg text-gray-600">{description}</h2>
        </div>
    );
}
 
export default SubHeading;