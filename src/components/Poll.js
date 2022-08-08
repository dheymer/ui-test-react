import React from "react";

const Poll = ({position, data, onVoteAdded, justVoted}) => {
    const totalVotes = data.votes.negative + data.votes.positive;
    const likeRate = ((data.votes.positive / totalVotes) * 100).toFixed(1);     // Percentage of positive votes
    const dislikeRate = ((data.votes.negative / totalVotes) * 100).toFixed(1);  // Percentage of negative votes
    let vote = '';                                                              // Value of the user's vote

    /**
     * Obtains the general opinion based on votes
     * @returns JSX with the right image to show if users like or dislike the celebrity
     */
    const generalResult = () => {
        return (
            (likeRate >= dislikeRate) ?
                <img src="../assets/img/thumbs-up.svg" alt="like" /> :
                <img src="../assets/img/thumbs-down.svg" alt="dislike" />
        );
    };

    /**
     * Obtains the relative time (days ago) from a specific date
     * @param {Date} timestampDate The date
     * @returns string with the time passed from the date, in days
     */
    const relativeDays = (timestampDate) => {
        const relativeTime = new Intl.RelativeTimeFormat('en', {numeric: 'auto'});
        const dayInMs = 1000 * 3600 * 24;
        const diffDays = Math.round(
            (timestampDate - new Date().getTime()) / dayInMs
        );
        return relativeTime.format(diffDays, 'day');
    };

    let pollConfig = (justVoted) ? {
            voteButton: 'Vote Again',
            eyebrowMessage: 'Thank you for your vote'
        } : {
            voteButton: 'Vote Now',
            eyebrowMessage: relativeDays(new Date(data.lastUpdated).getTime())
        }

    /**
     * Sets the value of the vote
     * @param {string} selectedVote the user's choice
     */
    const setVote = (selectedVote) => {
        vote = selectedVote;
        document.getElementById(`vote-${position}-${selectedVote}`).classList.add('selected');
        if(selectedVote === 'like') {
            document.getElementById(`vote-${position}-dislike`).classList.remove('selected');
        } else {
            document.getElementById(`vote-${position}-like`).classList.remove('selected');
        }
    }

    /**
     * Sends the vote to update the state
     * @param {number} itemIndex The index of the current poll object in the data array
     * @param {string} choice The user's chioce for the vote
     */
    const onVoteClick = (itemIndex, choice) => {
        if (choice === 'like') {
            data.votes.positive++;
        } else if (choice === 'dislike') {
            data.votes.negative++;
        }
        document.getElementById(`vote-${position}-dislike`).classList.remove('selected');
        document.getElementById(`vote-${position}-like`).classList.remove('selected');
        console.log(data);
        data.lastUpdated = new Date().toISOString();
        onVoteAdded(itemIndex, data, choice);
    };

    return (
        <div className="poll" style={{ backgroundImage: `url('../assets/img/${data.picture}')` }}>
            <div className="gradient-bg">
                <div className="poll-content">
                    <span className={`general-result ${((likeRate >= dislikeRate) ? 'like' : 'dislike')}`}>
                        {generalResult()}
                    </span>
                    <div className="information-block">
                        <h2>{data.name}</h2>
                        <div className="description">
                            <p>{data.description}</p>
                        </div>
                        <p className="bottom-note">{`${pollConfig.eyebrowMessage} in `} <span style={{textTransform:'capitalize'}}>{data.category}</span></p>
                        <div className="vote-form">
                            <span id={`vote-${position}-like`} className="like" onClick={() => setVote('like')}>
                                <img src="../assets/img/thumbs-up.svg" alt="like" />
                            </span>
                            <span id={`vote-${position}-dislike`} className="dislike" onClick={() => setVote('dislike')}>
                                <img src="../assets/img/thumbs-down.svg" alt="dislike" />
                            </span>
                            <button onClick={() => onVoteClick(position, vote)}>{pollConfig.voteButton}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="votation-results">
                <div className="like" style={{width: `${likeRate}%`}}>
                    <img src="../assets/img/thumbs-up.svg"  alt="like" /> {`${likeRate}%`}
                </div>
                <div className="dislike" style={{width: `${dislikeRate}%`}}>
                    <img src="../assets/img/thumbs-down.svg"  alt="dislike" /> {`${dislikeRate}%`}
                </div>
            </div>
        </div>
    );
}

export default Poll;