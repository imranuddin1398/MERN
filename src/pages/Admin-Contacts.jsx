import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const { authorizationToken } = useAuth();
    const getAllContactData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method: "GET",
                headers: {
                    "Authorization": authorizationToken,
                },
            });
            const data = await response.json();
            setContacts(data);
            console.log(`contacts ${JSON.stringify(data)}`);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": authorizationToken,
                },
            });
            const data = await response.json();
            // setcontacts(data);
            console.log(`contacts after delete ${JSON.stringify(data)}`);
            if (response.ok) {
                getAllContactData();
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getAllContactData();
    }, [authorizationToken]);
    return (
        <>
            <section className="admin-contacts-section">
                <div className="container">
                    <h1>Admin Contact Data</h1>
                </div>
                <div className="admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((curContact) => {
                                return <tr key={curContact.id || curContact.username}>
                                    <td>{curContact.username}</td>
                                    <td>{curContact.email}</td>
                                    <td>{curContact.message}</td>
                                    <td><button onClick={() => deleteContact(curContact._id)}>Delete</button></td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </div>

            </section >
        </>
    );
};