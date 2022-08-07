import React from "react";

const Poll = ({position, data}) => {
    const totalVotes = data.votes.negative + data.votes.positive;
    const likeRate = ((data.votes.positive / totalVotes) * 100).toFixed(1);     // Percentage of positive votes
    const dislikeRate = ((data.votes.negative / totalVotes) * 100).toFixed(1);  // Percentage of negative votes

    /**
     * Obtains the relative time (days ago) from a specific date
     * @param {*} timestampDate The date
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

    return (
        <div className="poll" style={{ backgroundImage: `url('../assets/img/${data.picture}')` }}>
            <div className="gradient-bg">
                <div className="poll-content">
                    <div className="information-block">
                        <h2>{data.name}</h2>
                        <div className="description">
                            <p>{data.description}</p>
                        </div>
                        <p className="bottom-note">{`${relativeDays(new Date(data.lastUpdated))} in `} <span style={{textTransform:'capitalize'}}>{data.category}</span></p>
                        <div className="vote-form">
                            <span className="like">
                                <img src="../assets/img/thumbs-up.svg" />
                            </span>
                            <span className="dislike">
                                <img src="../assets/img/thumbs-down.svg" />
                            </span>
                            <button>Vote Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="votation-results">
                <div className="like" style={{width: `${likeRate}%`}}>
                    <img src="../assets/img/thumbs-up.svg" /> {`${likeRate}%`}
                </div>
                <div className="dislike" style={{width: `${dislikeRate}%`}}>
                    <img src="../assets/img/thumbs-down.svg" /> {`${dislikeRate}%`}
                </div>
            </div>
        </div>
    );
}

export default Poll;