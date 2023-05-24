import { ToggleButton, Card } from "react-bootstrap"
import "./styles.css";

import useStore from "../store"

type VotingBlockItemProps = {
    nomineeId: number,
    name: string,
    imageUrl: string,
    categoryId: string
}

export function VotingBlockItem({nomineeId, name, imageUrl, categoryId} : VotingBlockItemProps) {
    const store = useStore();

    return (
        <div className="voting-item-container">
            <div>{name}</div>
            <img
                className="img"
                src={imageUrl}               
            />
            <div>
                <ToggleButton 
                    type="checkbox" 
                    value={nomineeId} 
                    checked={store.selectedNominees.some(selectedNominee => selectedNominee.nomineeId === nomineeId)} 
                    onClick={() => store.addSelectedNominees(categoryId, nomineeId, name)} 
                    className={store.selectedNominees.some(selectedNominee => selectedNominee.nomineeId === nomineeId) ? "checked-btn" : "unchecked-btn"}>
                        Vote
                </ToggleButton>
            </div>
        </div>
    )
}