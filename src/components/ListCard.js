

const ListCard = ({patient, onClick}) => {
    return (
        <div onClick={onClick} className="list-card">
            <span className="card-section-first">{patient.animalName}</span>
            <span className="card-section">{patient.animalType}</span>
            <span className="card-section">{patient.ownerName}</span>
            <span className="card-section">{patient.dateOfBirth}</span>
            <span className="card-section">{patient.diagnosis}</span>
            <span className="card-section">{patient.futureVisit}</span>
        </div>
    )
}

export default ListCard;