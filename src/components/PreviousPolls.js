import React from "react";
import Poll from "./Poll";

const PreviousPolls = ({ displayMode, pollsData, onVoteAdded, justVoted }) => {
    /**
     * Building polls list
     */
    const polls = pollsData.data.map((item, index) => {
        return (
            <React.Fragment key={index} >
                <Poll 
                    position={index} 
                    data={item} 
                    onVoteAdded={onVoteAdded} 
                    justVoted={(justVoted === index) ? true : false}
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