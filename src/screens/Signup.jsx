import { useState, useContext } from "react"
import { AuthContext } from "../App"
import '../assets/css/signup.css'

export default function Signup() {
    const [role, setRole] = useState("")
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
            {role === "" ? (
                <div className="content-wrapper">
                    <div class="content">
                        <h1>Sign Up</h1>
                        <div id="gridThumbs" className="gridthumbs-signup portfolio-grid-overlay grid-wrapper collection-content-wrapper">
                            <div className="grid-item" onClick={() => setRole("Seller")}>
                                <div class="grid-image">
                                    <div class="grid-image-inner-wrapper">
                                        <img src={require("../images/seller.jpg")} style={{width: "100%", height: "100%", objectPosition: "50% 50%", objectFit: "cover"}}/>
                                    </div>
                                </div>
                                <div class="portfolio-overlay"></div>
                                <div class="portfolio-text">
                                    <h3 class="portfolio-name">Seller</h3>
                                </div>
                            </div>
                            <div className="grid-item" onClick={() => setRole("Buyer")}>
                                <div class="grid-image">
                                    <div class="grid-image-inner-wrapper">
                                        <img src={require("../images/buyer.jpg")} style={{width: "100%", height: "100%", objectPosition: "50% 50%", objectFit: "cover"}}/>
                                    </div>
                                </div>
                                <div class="portfolio-overlay"></div>
                                <div class="portfolio-text">
                                    <h3 class="portfolio-name">Buyer</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // this will be signup form
                <div>
                    <h1>Welcome New {role}</h1>
                    <div>
                        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {/* when we click signup make a call to the express app with /user endpoint */}
                    <button onClick={() => {
                        fetch("/user", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({username, email, password, role})
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                // setuser in authcontext
                                setUser(data)
                            }
                        })
                    }}>
                        Sign Up
                    </button>
                </div>
            )}
        </div>
    )
}