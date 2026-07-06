import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const token = localStorage.getItem('token'); // <-- get JWT token

                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true, // for cookies if backend uses
                    headers: {
                        Authorization: `Bearer ${token}` // <-- send token
                    }
                });

                console.log(res.data.company);

                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log("Error fetching company by ID:", error);
            }
        }

        if(companyId) fetchSingleCompany(); // only fetch if companyId is provided
    }, [companyId, dispatch])
}

export default useGetCompanyById