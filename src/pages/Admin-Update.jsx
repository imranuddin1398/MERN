import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const EditUser = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const params = useParams();
    console.log("params Single user:", params)
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();
    const getSingleUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    "Authorization": authorizationToken,
                },
            });
            const data = await response.json();
            console.log(`users ${JSON.stringify(data)}`);
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, [authorizationToken]);

    const handleInput = (e) => {
        // console.log(e);
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value, });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authorizationToken,
                },
                body: JSON.stringify(data),
            }
            );
            if (response.ok) {
                toast.success("Updated Successfully");
                navigate("/admin/users")
            } else {
                toast.error("Not Updated");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Update User Data</h1>
                </div>
                {/* contact page main  */}
                <div className="container grid grid-two-cols">

                    {/* contact form content actual  */}
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={data.username}
                                    onChange={handleInput}
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email">email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={data.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    autoComplete="off"
                                    value={data.phone}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <button type="submit">Update</button>
                            </div>
                        </form>
                    </section>
                </div>

            </section>
        </>
    );
};