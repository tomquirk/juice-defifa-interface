/* eslint-disable react/no-unescaped-entities */
import { FC, useState } from "react";
import { useSubmitScorecards } from "../../../hooks/write/useSubmitScorecards";
import { convertScoreCardToPercents } from "../../../utils/scorecard";
import Button from "../../UI/Button";
import { ballkidsScorecard } from "../constants/ballKidsScorecard";
import { ScoreCard } from "../types";
import styles from "./Custom.module.css";

interface CustomScorecardProps {
  tiers: any[];
}

const CustomScorecard: FC<CustomScorecardProps> = ({ tiers }) => {
  const [scoreCard, setScoreCard] = useState<ScoreCard[]>([]);
  const { write, isLoading, isSuccess, isError, error } =
    useSubmitScorecards(scoreCard);

  const onTierScoreChange = (redemptionWeight: number, id: number) => {
    // Check if an object with the same id already exists in the scoreCard array
    const existingScore = scoreCard.find((score) => score.id === id);

    // If an object with the same id already exists, update its redemptionWeight
    if (existingScore) {
      const updatedScorecard = scoreCard.map((score) => {
        if (score.id === id) {
          return {
            id,
            redemptionWeight,
          };
        }
        return score;
      });
      setScoreCard(updatedScorecard);
    } else {
      // If an object with the same id does not exist, add a new object to the scoreCard array
      const updatedScorecard = [
        ...scoreCard,
        {
          id,
          redemptionWeight,
        },
      ];
      setScoreCard(updatedScorecard);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Fill your own scorecard</h3>
      <div className={styles.tiersContainer}>
        {tiers?.map((t: any) => (
          <div key={t.id}>
            <input
              className={styles.input}
              value={
                scoreCard.find((score) => score.id === t.id)
                  ? scoreCard.find((score) => score.id === t.id)
                      ?.redemptionWeight
                  : 0
              }
              onChange={(e) =>
                onTierScoreChange(parseFloat(e.currentTarget.value), t.id)
              }
              min={0}
              step={1}
              type="number"
            />
            <p>{t.teamName}</p>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <Button size="medium" onClick={() => write?.()} disabled={isLoading}>
          {isLoading ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              style={{ marginTop: "5px" }}
              src="/assets/defifa_spinner.gif"
              alt="spinner"
              width={35}
            />
          ) : (
            "Submit"
          )}
        </Button>
        <Button onClick={() => setScoreCard([])}>Clear all</Button>
      </div>
    </div>
  );
};

export default CustomScorecard;
