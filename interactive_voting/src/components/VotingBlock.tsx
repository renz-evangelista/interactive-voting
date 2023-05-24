import { Col, Row } from "react-bootstrap"
import { VotingBlockItem } from "./VotingBlockItem"

type Nominee = {
    nomineeId: number,
    name: string,
    imageUrl: string
}

type VotingBlockProps = {
    id: string,
    category: string,
    nominees: Nominee[]

}

export function VotingBlock({id, category, nominees} : VotingBlockProps) {
    return (
        <div className="voting-block-container">
            <div className="voting-block-header">Category: {category}</div>
            <Row md={2} xs={1} lg={3} className="g-3">
                {nominees.map(item => (
                        <Col key={item.nomineeId}><VotingBlockItem {...item} categoryId={id} /></Col>
                    ))}
            </Row>
        </div>
    )
}