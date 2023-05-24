import { useState } from 'react'
import { VotingBlock } from "../components/VotingBlock"
import { Button, Modal, Row } from "react-bootstrap"
import votingList from "../data/list.json"
import "./styles.css";

import useStore from "../store"

export function Voting() {
    const store = useStore();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>("");

    const handleSubmit = () => {
        if(votingList.length === store.selectedNominees.length){
            if (store.votedNominees.length > 0) {
                const names = store.votedNominees.map(nominee => nominee.name).toString()
                setModalText(`You already voted for: ${names}`)
            } else {
                store.addVotedNominees(store.selectedNominees)
                setModalText("Thank you for your votes!")
            }
            
        } else {
            setModalText("You have to pick one nominee for each category.")
        }
        setIsModalOpen(true);
        
    }

    return (
        <div className="voting-container">
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Body>{modalText}</Modal.Body>
            </Modal>
            <div className="voting-header">Online Votes</div>
            <div>
                <Row>
                    {votingList.map(item => (
                        <div key={item.id}><VotingBlock {...item} /></div>
                    ))}
                </Row>
            </div>
            <div className="submit-btn-container">
                <Button onClick={handleSubmit} className="submit-btn">Submit Your Votes</Button>
            </div>
        </div> 
    )
}