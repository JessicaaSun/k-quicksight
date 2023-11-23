"use client";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Image from "next/image";
import authenticated from '@assets/images/403.png'
import {avatar, Button, Input, Textarea} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useUpdateUserMutation} from "@/store/features/user/userInfoApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentImage} from "@/store/features/profile_image/imageSlice";
import {setUserInfo} from "@/store/features/user/userInfo";
import {Select} from "antd";
import Loading from "@/app/loading";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useUploadSingleMutation} from "@/store/features/user/uploadAccountImage";

export default function Profile() {
    const { data: user, isLoading, refetch: refetchUser} = useGetUserQuery();
    const router = useRouter();
    const [updateProfile] = useUpdateUserMutation();
    const userInfo = useSelector(state => state?.userInfo?.userInfo)
    const [username, setUsername] = useState('');
    const [UpdateUsername, setUpdateUsername] = useState(false);
    const [email, setEmail] = useState('');
    const [update_email, set_updateEmail] = useState(false);
    const [phone_number, setPhone_number] = useState('');
    const [update_phone_number, set_update_Phone_number] = useState(false);
    const [description, setDescription] = useState('');
    const [update_description, set_updateDescription] = useState(false);
    const [gender, setGender] = useState('');
    const [updateGender, set_updateGender] = useState(false);
    const [url, setUrl] = useState(null);
    const [imageName, setNameImage] = useState('');
    const dispatch = useDispatch();
    const [ErrorUpdate, setError] = useState([]);
    const [uploadImage] = useUploadSingleMutation();
    const profile = useSelector((state) => state.image.image);
    const profileImage = `${process.env.NEXT_PUBLIC_BASE_URL}files/${user?.data.avatar}`;
    const [full_name, setFullName] = useState('')
    
    useEffect(() => {
        refetchUser();
        setUsername(user?.data.username)
        setEmail((user?.data.email))
        setPhone_number(user?.data.phone_number)
        setDescription(user?.data.biography)
        // setUrl(profileImage)
        setNameImage(profileImage)
        setGender(user?.data.gender)
        dispatch(setCurrentImage(profileImage))
        setFullName(user?.data.full_name)
    }, [dispatch, imageName, profileImage, refetchUser, url, user])
    const updateUserName = async () => {
        setUpdateUsername(false);
        const data = {
            username: username,
            full_name: full_name,
        }
        const updateUsername = await updateProfile({data: data, id: user?.data.id})
        // console.log(updateUsername)
        if (updateUsername) {
            setError(updateUsername?.error?.data?.username)
        } else if (updateUsername?.data?.username) {
            setError(null)
        }
    };
    const updatePhoneNumber = () => {
        set_update_Phone_number(false)
        const data = {
            username: username,
            phone_number: phone_number
        }
        const updatephone_number = updateProfile({data: data, id: user?.data.id})
    }
    const updateBio = () => {
        set_updateDescription(false)
        const data = {
            username: username,
            biography: description
        }
        const updateBiolophy = updateProfile({data: data, id: user?.data.id})
    }
    const updateGender_fun = () => {
        set_updateGender(false)
        const data = {
            username: username,
            gender: gender
        }
        const updateGender = updateProfile({data: data, id: user?.data.id})
    }

    const handleChange = (value) => {
        setGender(value)
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const preview = URL.createObjectURL(file)


        if (!file) {
            return;
        }

        try {
            const response = await uploadImage(file);
            const imageUrl = response.data.filename;
            setNameImage(imageUrl)
            dispatch(setCurrentImage(response.data.url))
            refetchUser();
            setUrl(preview)

            const updateProfileResponse = await updateProfile({
                data: {
                    username: username,
                    avatar: response.data.filename
                },
                id: user?.data.id
            });
            // console.log(user)

            // dispatch(setCurrentImage(imageUrl));
        } catch (error) {
            console.error(error.message);
        }
    };

    const state = useSelector(state => state)
    console.log(state)

    if(isLoading) {
        return (<Loading />)
    } else if (!user)
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-28">
                <Image src={authenticated} alt={"authorize"} className={'lg:w-1/4 md:w-2/3 w-full'} />
                <p className={'lg:text-2xl md:text-xl text-lg text-primary-color font-bold text-center'}>This page has been not authenticated</p>
                <Button onClick={() => router.push('/')} className={'mt-10 bg-primary-color text-background-color'}>
                    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.155 13.2996L16.2245 18.4558C16.3223 18.5519 16.4003 18.6669 16.454 18.794C16.5076 18.921 16.5359 19.0577 16.5371 19.196C16.5383 19.3344 16.5123 19.4715 16.4608 19.5995C16.4094 19.7276 16.3333 19.8439 16.2371 19.9417C16.141 20.0395 16.0266 20.1168 15.9008 20.1692C15.7749 20.2216 15.6401 20.2479 15.5041 20.2467C15.3681 20.2455 15.2337 20.2168 15.1088 20.1622C14.9838 20.1076 14.8708 20.0282 14.7763 19.9288L8.98283 14.036C8.79083 13.8407 8.68298 13.5758 8.68298 13.2996C8.68298 13.0234 8.79083 12.7585 8.98283 12.5631L14.7763 6.67043C14.8708 6.57094 14.9838 6.49158 15.1088 6.43699C15.2337 6.38239 15.3681 6.35366 15.5041 6.35246C15.6401 6.35125 15.7749 6.37761 15.9008 6.42999C16.0266 6.48236 16.141 6.55971 16.2371 6.65751C16.3333 6.75532 16.4094 6.87162 16.4608 6.99964C16.5123 7.12766 16.5383 7.26482 16.5371 7.40314C16.5359 7.54145 16.5076 7.67813 16.454 7.80522C16.4003 7.93231 16.3223 8.04725 16.2245 8.14334L11.155 13.2996Z" fill="white"/>
                    </svg>
                    Back to homepage</Button>
            </div>
        );

    let content = null;

    if (user) {
        content = (
            <div className="flex min-h-screen flex-col items-center justify-start lg:px-[10%] md:px-[5%] px-3 py-48">
                <div className={'p-5 w-full text-white min-h-[190px] rounded-2xl bg-[#1E2875]'}>
                    <p className={'text-lg uppercase'}>my profile</p>
                </div>
                <div className={'lg:flex md:flex justify-center items-start lg:w-3/4 md:w-full w-full gap-5'}>
                    <div className={'bg-white border-2 border-gray-300 lg:w-1/2 relative md:w-1/2 w-full mb-5 -mt-20 rounded-xl p-7 flex flex-col'}>
                        <div className={'flex justify-center items-center relative'}>
                            <div className={'relative'}>
                                <input
                                    id="upload-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={url ? url : profile} alt={'profile_image'} className={'w-[150px] h-[150px] object-cover rounded-full'} />
                                <label htmlFor="upload-input" className={'absolute hover:bg-secondary-color transition-all cursor-pointer bottom-0 right-0 bg-primary-color p-3 rounded-full'}>
                                  <span>
                                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M14.1208 6.96758L15.9168 5.17157L15.9168 5.17156C16.462 4.62632 16.7346 4.3537 16.8804 4.0596C17.1577 3.50005 17.1577 2.8431 16.8804 2.28354C16.7346 1.98945 16.462 1.71683 15.9168 1.17158L15.9168 1.17157C15.3715 0.626323 15.0989 0.353698 14.8048 0.207962C14.2452 -0.0693207 13.5883 -0.0693207 13.0287 0.207962C12.7346 0.353698 12.462 0.626323 11.9168 1.17157L10.0981 2.99023C11.062 4.64083 12.4481 6.01639 14.1208 6.96758ZM8.64366 4.44469L1.78825 11.3001C1.3558 11.7325 1.13958 11.9488 0.998787 12.215C0.857996 12.4811 0.800957 12.7816 0.686879 13.3824L0.134002 16.2943C0.0731047 16.6151 0.0426559 16.7755 0.134028 16.8687C0.225398 16.962 0.386364 16.9349 0.708293 16.8807H0.708301L3.65659 16.3839C4.28158 16.2786 4.59407 16.2259 4.87112 16.0831C5.14817 15.9402 5.37225 15.7161 5.82041 15.2679L5.82042 15.2679L12.6626 8.42579C11.0409 7.41014 9.6692 6.04785 8.64366 4.44469Z" fill="#ffffff"/>
                                    </svg>
                                  </span>
                                </label>
                            </div>
                        </div>
                        <div className={'border-1 shadow-md mt-10 rounded-lg p-5 flex flex-col justify-start items-start border-gray-200'}>
                            <div className={'flex flex-col justify-between gap-5 items-start w-full'}>
                                <div className={'flex flex-col gap-1 w-full'}>
                                    <p className={'font-medium w-full text-lg text-description-color'}>Your Name</p>
                                    <p className={'text-sm font-medium text-primary-color'}>@{user?.data.username ? user?.data.username : user?.data.full_name}</p>
                                    <div className={'flex flex-row gap-5 justify-between w-full items-center '}>
                                        {!UpdateUsername ? (
                                                <p className={`font-medium text-lg text-text-color`}>{user?.data.full_name}</p>
                                        ):(
                                            <Input classNames={{
                                                inputWrapper: 'h-[46px]'
                                            }} type={'text'} value={full_name} onValueChange={setFullName} placeholder={full_name} className={'font-medium text-text-color text-lg'} />
                                        )}
                                        {
                                            UpdateUsername ? (
                                                <button onClick={updateUserName} className={'text-text-color hover:bg-primary-color hover:text-white transition-all px-5 py-1 bg-blue-300 rounded-full text-small'}>Done</button>
                                            ) : (
                                                <button onClick={() => setUpdateUsername(true)} className={'text-text-color hover:bg-primary-color hover:text-white transition-all px-5 py-1 bg-blue-300 rounded-full text-small'}>Edit</button>
                                            )
                                        }

                                    </div>
                                    <div>
                                        {
                                            ErrorUpdate? ErrorUpdate.map((item, index) => (
                                                <p key={index} className={'text-red-500'}>{item} </p>
                                            )) : null
                                        }
                                    </div>
                                </div>
                                <div className={'flex flex-col gap-1 w-full'}>
                                    <p className={'font-medium w-full text-lg text-description-color'}>Your Gender</p>
                                    <div className={'flex flex-row gap-5 justify-between w-full items-center '}>
                                        {!updateGender ? (
                                            <p className={'font-medium text-text-color text-lg'}>{userInfo ? userInfo.gender : gender}</p>
                                        ):(
                                            <Select
                                                defaultValue={userInfo ? userInfo.gender : gender}
                                                style={{
                                                    width: '100%',
                                                }}
                                                onChange={handleChange}
                                                options={[
                                                    {
                                                        value: "Male",
                                                        label: "Male",
                                                    },
                                                    {
                                                        value: 'Female',
                                                        label: 'Female',
                                                    },
                                                ]}
                                            />
                                        )}
                                        {
                                            updateGender ? (
                                                <button onClick={updateGender_fun} className={'text-text-color hover:bg-primary-color hover:text-white transition-all px-5 py-1 bg-blue-300 rounded-full text-small'}>Done</button>
                                            ) : (
                                                <button onClick={() => set_updateGender(true)} className={'text-text-color hover:bg-primary-color hover:text-white transition-all px-5 py-1 bg-blue-300 rounded-full text-small'}>Edit</button>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={'flex flex-col gap-1 w-full'}>
                                    <p className={'font-medium w-full text-lg text-description-color'}>Your Email</p>
                                    <div className={'flex flex-row justify-between gap-5 w-full items-center '}>
                                        <p className={'font-medium text-text-color text-lg'}>{email}</p>
                                    </div>
                                </div>
                                <div className={'flex flex-col gap-1 w-full'}>
                                    <p className={'font-medium w-full text-lg text-description-color'}>Your Phone Number</p>
                                    <div className={'flex flex-row gap-5 justify-between w-full items-center '}>
                                        {
                                            !update_phone_number ? (
                                                <p className={'font-medium text-text-color text-lg'}>{userInfo ? userInfo.phone_number : phone_number}</p>
                                            ) : (
                                                <Input type={'text'} classNames={{
                                                    inputWrapper: 'h-[46px]'
                                                }} value={phone_number} onValueChange={setPhone_number} className={'font-medium text-text-color text-lg'}>{!phone_number ? 'UnKnown' : phone_number}</Input>
                                            )
                                        }
                                        {
                                            update_phone_number ? (
                                                <button onClick={updatePhoneNumber} className={'text-text-color hover:bg-primary-color hover:text-white transition-all px-5 py-1 bg-blue-300 rounded-full text-small'}>Done</button>
                                            ) : (
                                                <button onClick={() => set_update_Phone_number(true)} className={'text-text-color hover:bg-primary-color hover:text-white transition-all px-5 py-1 bg-blue-300 rounded-full text-small'}>Edit</button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'border-1 shadow-md mt-10 rounded-lg p-5 flex flex-col justify-start items-start border-gray-200'}>
                            <div className={'flex justify-between items-center w-full'}>
                                <p className={'text-xl font-bold text-text-color capitalize'}>about <span className={'text-primary-color'}>{userInfo ? userInfo.username : username}</span></p>
                                {
                                    update_description ? (
                                        <button onClick={updateBio} className={'text-text-color hover:bg-primary-color hover:text-white transition-all px-5 py-1 bg-blue-300 rounded-full text-small'}>Done</button>
                                    ) : (
                                        <button onClick={() => set_updateDescription(true)} className={'text-text-color hover:bg-primary-color hover:text-white transition-all px-5 py-1 bg-blue-300 rounded-full text-small'}>Edit</button>
                                    )
                                }
                            </div>
                            <div className={'text-md text-text-color mt-5 w-full'}>
                                {
                                    !update_description ? (
                                        <div>
                                            {
                                                userInfo ? userInfo.biography : description ? description : (
                                                    <span className={'text-description-color'}>UnKnown Biology</span>
                                                )
                                            }
                                        </div>
                                    ) : (
                                        <Textarea type={'text'} value={description} onValueChange={setDescription} placeholder={description} className={'w-full'} />
                                    )
                                }
                            </div>
                        </div>
                        <div className={'border-1 shadow-md mt-10 rounded-lg p-5 flex flex-col justify-start items-start border-gray-200'}>
                            <p className={'text-xl w-full font-bold text-text-color capitalize'}>Storage usage</p>
                            <div className={'w-full flex justify-between items-center mt-5'}>
                                <p className={'font-semibold text-lg text-text-color'}>Free</p>
                                <div className={'text-md text-text-color bg-green-300 px-6 rounded-full py-0.5'}>1 GB</div>
                            </div>
                            <div className={'w-full flex justify-between items-center mt-5'}>
                                <p className={'font-semibold text-lg text-text-color'}>Used</p>
                                <div className={'text-md text-text-color bg-gray-100 px-6 rounded-full py-0.5'}>{user?.data.storage_data} KB</div>
                            </div>
                        </div>
                    </div>
                    <div className={'lg:w-1/2 relative md:w-1/2 w-full mb-5 lg:-mt-20 md:-mt-20 mt-0 rounded-xl flex flex-col'}>
                        <div className={'bg-white min-h-[267px] border-2 shadow-md rounded-lg p-5 flex flex-col justify-start items-start border-gray-200'}>Analysis</div>
                        <div className={'bg-white min-h-[383px] border-2 shadow-md mt-5 rounded-lg p-5 flex flex-col justify-start items-start border-gray-200'}>Dashboard</div>
                    </div>
                </div>
            </div>
        );
    }

    return content;
}