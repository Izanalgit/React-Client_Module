import ContactRequest from "../contacts/ContactRequest";

const SearchProfileCard = ({ contactId, contactName }) => {

    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h4>{contactName}</h4>
            <ContactRequest contactId={contactId}/>
        </div>
    );
};

export default SearchProfileCard;