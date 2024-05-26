import React, { useState, useEffect, useRef } from "react";
import defaultPhoto from "./pro.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const Profile = (props) => {
    const navigate = useNavigate();
    const { logout, authToken} = useAuth();
    const [userData, setUserData] = useState({
        name: "",
        contactnumber: "",
        email: "",
        uniqueid: "",
        productUploadedForSale: 0,
        productBought: 0,
        image: null
    });

    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                //const authToken = localStorage.getItem("token");
                if (!authToken) {
                    navigate("/login");
                    return;
                }
                const response = await fetch("http://localhost:5000/api/auth/getuser", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + authToken,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                console.log(data);
                setUserData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };
        fetchUserData();
    });

    const handlePhotoChange = async (event) => {
        const selectedPhoto = event.target.files[0];
        const formData = new FormData();
        formData.append("photo", selectedPhoto);

        try {
            //const authToken = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/auth/uploadphoto", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + authToken
                },
                body: formData,
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.error || "Failed to upload photo");
            }
            setUserData((prevUserData) => ({
                ...prevUserData,
                image: responseData.image,
            }));
            props.showAlert("Photo uploaded successfully", "success");
        } catch (error) {
            console.error("Error uploading photo:", error);
            props.showAlert("Failed to upload photo", "danger");
        }
    };

    const handleUploadPhotoClick = () => {
      fileInputRef.current.click();
    };

    const handleLogout = () => {
        //localStorage.removeItem("token");
        logout();
        navigate("/login");
        props.showAlert("Logged out successfully", "success");
    };

  const handleEditDetails = () => {
    navigate("/edituser");
  };

  const handleClick1 = () => {
    localStorage.setItem("uniqueid", userData.uniqueid);
    navigate("/postproduct");
  };

  const handleClick2 = () => {
    localStorage.setItem("uniqueid", userData.uniqueid);
    navigate("/viewproduct");
  };

  const styles = {
    gradient: {
      padding: "20px",
      height: "50%",
      marginTop: "100px",
    },
    back: {
      background: "linear-gradient(45deg, #CAF0F8, #0096C7)",
      borderRadius: "15px",
    },
    profileRow: {
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "row",
    },
    profileColumn: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "column",
    },
    profileColumnImg: {
      marginLeft: "80px",
    },
    img: {
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      marginBottom: "20px",
      marginTop: "20px",
      marginLeft: "80px",
      marginRight: "30px",
      objectFit: "cover",
    },
    userDetails: {
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "5px",
      width: "350px",
      height: "220px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      marginTop: "20px",
      marginLeft: "20px",
      marginRight: "10px",
    },
    userDetailsP: {
      margin: "10px 0",
      textAlign: "left",
    },
    input: {
      display: "none",
    },
    button: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginLeft: "120px",
    }
  };

  return (
    <>
      <div style={styles.gradient}>
        <div style={styles.back}>
          <div style={styles.profileRow}>
            <div style={styles.profileColumn}>
            <img
                src={userData.imagePath ? userData.imagePath : defaultPhoto}
                alt="Profile"
                name="photo"
                style={{ ...styles.img }}
            />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    ref={fileInputRef}
                    style={{ ...styles.input }}
                  />
                  <button onClick={handleUploadPhotoClick} style={{ ...styles.button }}>
                    Upload Photo
                  </button>
                </div>
            </div>
            {!loading && (
              <div style={styles.userDetails}>
                <p style={styles.userDetailsP}>Name: {userData.name}</p>
                <p style={styles.userDetailsP}>
                  Contact Number: {userData.contactnumber}
                </p>
                <p style={styles.userDetailsP}>Email: {userData.email}</p>
                <p style={styles.userDetailsP}>
                  Product Uploaded for Selling: {userData.productUploadedForSale}
                </p>
                <p style={styles.userDetailsP}>Product Bought : {userData.productBought}</p>
              </div>
            )}
          </div>
          <div className="container" style={{ display: "flex", marginTop: "20px", justifyContent: "center" }}>
            <button className="btn btn-primary mx-3" onClick={handleEditDetails} style={{ marginLeft: "120px" }}>
              Edit Details
            </button>
            <button className="btn btn-primary mx-3" onClick={handleClick1}>
              POST PRODUCT FOR SELLING
            </button>
            <button className="btn btn-primary mx-3" onClick={handleClick2}>
              VIEW PRODUCT SOLD OR BOUGHT
            </button>
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div style={{ height: "50px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
