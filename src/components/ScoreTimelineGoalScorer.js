import React from 'react';
import Def from 'material-ui/svg-icons/action/accessibility';
import Off from 'material-ui/svg-icons/maps/directions-run';

const ScoreTimelineGoalScorer = ({ goalScorer }) => {
  const playerName = getPlayerById(goalScorer.id).name;

  return (
    <div className="scoretimeline__goalscorer">
      <div className="team1score">
        { isTeam1Goal(goalScorer) ?
          <div>
            {isOffensive(goalScorer) ? <Off /> : <Def />}
            <span>{playerName}</span>
          </div> :
          ''
        }
      </div>
      <div className="team2score">
        { !isTeam1Goal(goalScorer) ?
          <div>
            <div>{playerName}</div>
            {isOffensive(goalScorer) ? <Off /> : <Def />}
          </div> :
          ''
        }
      </div>
    </div>
  );
};

export default ScoreTimelineGoalScorer;
