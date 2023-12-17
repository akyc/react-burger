import {
    pageRoutes,
    useDispatch,
    useSelector
} from "../../utils/constants";
import {
    useLocation
} from "react-router-dom";
import {
    ProfileNav
} from "../ProfileNav/ProfileNav";
import {
    Order
} from "../Order/order";
import {
    nanoid
} from "nanoid";
import styles from './ProfileOrder.module.css'
import {
    getCookie
} from "../../utils/cookies";
import {
    useEffect
} from "react";
import {
    userWsConnectionClosed,
    userWsConnectionStart
} from "../../services/actions/user-socket";
export const ProfileOrder = () => {
     const location = useLocation();
     const dispatch = useDispatch();

    useEffect(() => {
        const token = getCookie('access');
        dispatch(userWsConnectionStart(token));
    }, [])

    useEffect(() => {
        if (location.pathname !== `${pageRoutes.profile}${pageRoutes.orders}`)
            dispatch(userWsConnectionClosed())
    }, [location, dispatch])

     const { orders: data } = useSelector(state => state.userOrders);
    return (
        data && <main className={styles.main}>
            <ProfileNav />
            <section className={styles.section}>
                <div className={`${styles.scroll} mt-10`}>
                    {data.map((element) => <Order element={element} key={nanoid()} />)}
                </div>
            </section>
        </main>
    )
 }
