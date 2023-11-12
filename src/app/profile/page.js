"use client";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Image from "next/image";
import authenticated from '@assets/images/403.png'
import {Button, Input, Textarea} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import {useUpdateUserMutation} from "@/store/features/user/userInfoApiSlice";
import {useDispatch} from "react-redux";
import {setCurrentImage} from "@/store/features/profile_image/imageSlice";

export default function Profile() {
  const { data: user } = useGetUserQuery();
  const router = useRouter();
  const [updateProfile] = useUpdateUserMutation();

  const [username, setUsername] = useState('');
  const [UpdateUsername, setUpdateUsername] = useState(false);

  const [email, setEmail] = useState('');
  const [update_email, set_updateEmail] = useState(false);

  const [phone_number, setPhone_number] = useState('');
  const [update_phone_number, set_update_Phone_number] = useState(false);

  const [description, setDescription] = useState('');
  const [update_description, set_updateDescription] = useState(false);

  const [url, setUrl] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        setUsername(user?.data.username)
        setEmail((user?.data.email))
        setPhone_number(user?.data.phone_number)
        setDescription(user?.data.biography)
        setUrl(user?.data?.avatar)
    }, [user]);

    const update_info = async (phone_number, address, biography, avatar, username, gender) => {
        const id = user?.data.uuid
        const dataUpdate = {
            phone_number: phone_number,
            address: address, // Update the address parameter
            biography: biography,
            avatar: avatar, // Update the avatar parameter
            username: username,
            gender: 'Male',
        };
        const updateUser = await updateProfile({id, data: dataUpdate})
        dispatch(setCurrentImage(avatar))
    };

    const updateUserName = () => {
        setUpdateUsername(false);
        update_info(
            phone_number,
            "address",
            description,
            url,
            username
        );
    };
  const updateEmail = () => {
      set_updateEmail(false)
      update_info(
          phone_number,
          "address",
          description,
          url,
          username,
          "male"
      );
  }

  const updatePhoneNumber = () => {
      set_update_Phone_number(false)
      update_info(
          phone_number,
          "address",
          description,
          url,
          username,
          "male"
      );

  }

  const updateBio = () => {
      set_updateDescription(false)
      update_info(
          phone_number,
          "address",
          description,
          url,
          username,
          "male"
      );
  }
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}files/upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUrl(response.data.url)
            update_info(
                phone_number,
                "address",
                description,
                response.data.url,
                username,
                "male"
            );
        } catch (error) {
            console.error(error);
        }
    };

  if (!user)
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
                    <label htmlFor="upload-input" className={'absolute cursor-pointer top-5 bg-white p-3 rounded-full right-5'}>
                        <span>
                            <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.3104 6.93481L22.0594 9.18579C21.8299 9.41528 21.4588 9.41528 21.2293 9.18579L15.8094 3.76587C15.5799 3.53638 15.5799 3.16528 15.8094 2.93579L18.0604 0.684814C18.9735 -0.228271 20.4578 -0.228271 21.3758 0.684814L24.3104 3.61938C25.2283 4.53247 25.2283 6.01685 24.3104 6.93481ZM13.8758 4.86939L1.05353 17.6916L0.0183743 23.6243C-0.123227 24.425 0.575015 25.1184 1.3758 24.9817L7.30841 23.9416L20.1307 11.1194C20.3602 10.8899 20.3602 10.5188 20.1307 10.2893L14.7108 4.86939C14.4764 4.63989 14.1053 4.63989 13.8758 4.86939ZM6.05841 16.593C5.78986 16.3245 5.78986 15.8948 6.05841 15.6262L13.5779 8.10669C13.8465 7.83814 14.2762 7.83814 14.5447 8.10669C14.8133 8.37524 14.8133 8.80493 14.5447 9.07349L7.02521 16.593C6.75666 16.8616 6.32697 16.8616 6.05841 16.593ZM4.29572 20.6995H6.63947V22.4719L3.49005 23.0237L1.9715 21.5051L2.52326 18.3557H4.29572V20.6995Z" fill="#0346A5"/>
                            </svg>
                        </span>
                        <input
                            id="upload-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} width={100} height={100} alt={'profile_image'} className={'w-[150px] h-[150px] object-cover rounded-full'} />
                </div>
                  <div className={'border-1 shadow-md mt-10 rounded-lg p-5 flex flex-col justify-start items-start border-gray-200'}>
                      <div className={'flex flex-col justify-between gap-5 items-start w-full'}>
                          <div className={'flex flex-col gap-1 w-full'}>
                              <p className={'font-medium w-full text-lg text-description-color'}>Your Name</p>
                              <div className={'flex flex-row gap-5 justify-between w-full items-center '}>
                                  {!UpdateUsername ? (
                                      <p className={'font-medium text-text-color text-lg'}>{username}</p>
                                  ):(
                                      <Input classNames={{
                                          inputWrapper: 'h-[46px]'
                                      }} type={'text'} value={username} onValueChange={setUsername} placeholder={username} className={'font-medium text-text-color text-lg'} />
                                  )}
                                  {
                                      UpdateUsername ? (
                                          <button onClick={updateUserName} className={'text-text-color hover:bg-primary-color hover:text-white transition-all px-5 py-1 bg-blue-300 rounded-full text-small'}>Done</button>
                                      ) : (
                                          <button onClick={() => setUpdateUsername(true)} className={'text-text-color hover:bg-primary-color hover:text-white transition-all px-5 py-1 bg-blue-300 rounded-full text-small'}>Edit</button>
                                      )
                                  }
                              </div>
                          </div>
                          <div className={'flex flex-col gap-1 w-full'}>
                              <p className={'font-medium w-full text-lg text-description-color'}>Your Email</p>
                              <div className={'flex flex-row justify-between gap-5 w-full items-center '}>
                                  {
                                      !update_email ? (
                                          <p className={'font-medium text-text-color text-lg'}>{email}</p>
                                      ) : (
                                          <Input classNames={{
                                              inputWrapper: 'h-[46px]'
                                          }} value={email} onValueChange={setEmail} type={'email'} className={'font-medium text-text-color text-lg'} />
                                      )
                                  }
                                  {
                                      update_email ? (
                                          <button onClick={updateEmail} className={'text-text-color hover:bg-primary-color hover:text-white transition-all px-5 py-1 bg-blue-300 rounded-full text-small'}>Done</button>
                                      ) : (
                                          <button onClick={() => set_updateEmail(true)} className={'text-text-color hover:bg-primary-color hover:text-white transition-all px-5 py-1 bg-blue-300 rounded-full text-small'}>Edit</button>
                                      )
                                  }
                              </div>
                          </div>
                          <div className={'flex flex-col gap-1 w-full'}>
                              <p className={'font-medium w-full text-lg text-description-color'}>Your Phone Number</p>
                              <div className={'flex flex-row gap-5 justify-between w-full items-center '}>
                                  {
                                      !update_phone_number ? (
                                          <p className={'font-medium text-text-color text-lg'}>{!phone_number ? 'UnKnown' : phone_number}</p>
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
                          <p className={'text-xl font-bold text-text-color capitalize'}>about <span className={'text-primary-color'}>{user?.data.username ? user?.data.username : 'UnKnown'}</span></p>
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
                                          description ? description : (
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
                          <div className={'text-md text-text-color bg-gray-100 px-6 rounded-full py-0.5'}>20 KB</div>
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
