import {useState, useEffect} from 'react';
import SignUpCSS from "./SignUp.module.css";
import img1 from "../../assets/pengu.png";
import axios from 'axios';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import {emitData, listenerData} from "../../socket";
import 'react-toastify/dist/ReactToastify.css';

const ErrorToast = (msg) => {
    toast.error(msg);
}

const successToast = (msg) => {
    toast.success(msg);
}
const SignUp = () => {

    const [data, setData] = useState(null);
    const [lines, setLines] = useState([]);
    // const dataFetchedRef = useRef(false);
    // const navigate = useNavigate();
    useEffect(() => {
        // if (dataFetchedRef.current) return;
        // dataFetchedRef.current = true;
        listenerData(setLines)
        // return () => {
        //   }
    },[])

    const formik = useFormik({
        initialValues: {
            user: "",
            ipAdd: "",
            passWord: "",
            pathSys: ""
        }
    })

    const signUp = () => {
        const myUrl = 'http://172.104.174.187:4054/api/linux-logs';
        // const myUrl = 'http://localhost:4054/api/linux-logs';
        axios.post(myUrl, formik?.values)
            .then((response) => {
                successToast("API Successful");
                // navigate("/login");
                setData(response.data);
                emitData("Request Logs");
                // console.log('here')
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
                        <label for="">User</label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            value={formik.values.user}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className={SignUpCSS["resizing-input-fields"]}>
                        <label for="" >IP Address</label>
                        <input type="text"
                            id="ipAdd"
                            name="ipAdd"
                            value={formik.values.ipAdd}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
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
                    </div>
                    <div className={SignUpCSS["resizing-input-fields"]}>
                        <label for="">Path</label>
                        <input
                            type="text"
                            id="pathSys"
                            name="pathSys"
                            value={formik.values.pathSys}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className={SignUpCSS["signup-btn"]}>
                        <input type="button" name="" value="Connect" onClick={() => signUp()} />
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