import {useState, useEffect} from 'react';
import SignUpCSS from "./SignUp.module.css";
import img1 from "../../assets/add-user.png";
import axios from 'axios';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { SignupValidationSchema } from "../Validations/Validations";
// import { useEffect } from "react";
// import Button from 'react-bootstrap/Button';
import {emitData, listenerData} from "../../socket";

const ErrorToast = (msg) => {
    toast.error(msg);
}

const successToast = (msg) => {
    toast.success(msg);
}
const SignUp = () => {

    const [data, setData] = useState(null);
    const [lines, setLines] = useState([]);
    // const navigate = useNavigate();
    useEffect(() => {
        listenerData(setLines)
    },[])
    


    const formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            passWord: "",
            confirmPassword: ""
        },
        validationSchema: SignupValidationSchema
    })

    const signUp = () => {
        // const myUrl = 'http://172.104.174.187:4054/api/linux-logs';
        const myUrl = 'http://localhost:4054/api/linux-logs';
        axios.post(myUrl, formik?.values)
            .then((response) => {
                successToast("API Successful");
                // navigate("/login");
                setData(response.data);
                emitData("Request Logs");
            })
            .catch((error) => {
                console.log(error);
                ErrorToast("Unexpected Error!");
            })
    };
    return (
        <div className={SignUpCSS["super-container"]} >
        <div className={SignUpCSS["main-container"]}>
            <div className={SignUpCSS["sign-up-container"]}>
                <div className={SignUpCSS["sign-up-title"]}>
                    <img src={img1} alt="" />
                    <span>Connector</span>
                </div>
                <form className={SignUpCSS["signup-form"]}>
                    <div className={SignUpCSS["resizing-input-fields"]}>
                        <label for="">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <span className={SignUpCSS["error-message"]} >{formik.errors.email}</span>
                        ) : null}
                    </div>
                    <div className={SignUpCSS["resizing-input-fields"]}>
                        <label for="" >Username</label>
                        <input type="text"
                            id="userName"
                            name="userName"
                            value={formik.values.userName}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                            <span className={SignUpCSS["error-message"]} >{formik.errors.userName}</span>
                        ) : null}
                    </div>

                    <div className={SignUpCSS["resizing-input-fields"]}>
                        <label for="">Password</label>
                        <input type="password"
                            id="passWord"
                            name="passWord"
                            value={formik.values.passWord}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.passWord && formik.errors.passWord ? (
                            <span className={SignUpCSS["error-message"]} >{formik.errors.passWord}</span>
                        ) : null}
                    </div>
                    <div className={SignUpCSS["resizing-input-fields"]}>
                        <label for="">Confirm Password</label>
                        <input type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <span className={SignUpCSS["error-message"]} >{formik.errors.confirmPassword}</span>
                        ) : null}
                    </div>
                    <div className={SignUpCSS.checkbox}>
                        <input type="checkbox" />  Accept terms and conditions
                </div>
                    <div className={SignUpCSS["signup-btn"]}>
                        <input type="button"
                            style={{ opacity: formik.isValid ? 1 : 0.7 }}
                            disabled={!formik.isValid} name="" value="Connect" onClick={() => signUp()} />
                    </div>
                    <div className={SignUpCSS["back-to-login"]}>
                    {/* <Button variant="link" onClick={()=>navigate("/")}>Back to Main</Button>  */}
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
        {
            data &&
            <div className={SignUpCSS["main-container"]}>
                    <div className={SignUpCSS["output-card"]}>
                    <h2>Data Recieved:</h2>
                    <p></p>
                    {lines.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                    </div>
            </div>
        }
        </div>
    )
}

export default SignUp