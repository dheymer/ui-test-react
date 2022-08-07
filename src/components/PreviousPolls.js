import React from "react";
import Poll from "./Poll";

const PreviousPolls = ({ displayMode, pollsData }) => {
    /**
     * Building polls list
     */
    const polls = pollsData.data.map((item, index) => {
        return (
            <React.Fragment key={index} >
                <Poll 
                    position={index} 
                    data={item} 
                />
            </React.Fragment>
        );
    });

    return (
        <div className={`previous-polls ${displayMode}`}>
            {polls}
        </div>
    );
}

export default PreviousPolls;