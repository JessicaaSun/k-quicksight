"use client";
import Image from "next/image";
import authenticated from "@assets/images/403.png";
import {
  avatar,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/store/features/user/userApiSlice";
import { generateBashURL } from "@/utils/util";
import { useUploadSingleMutation } from "@/store/features/user/uploadAccountImage";
import { FaPencilAlt, FaStar } from "react-icons/fa";
import Link from "next/link";
import { useGetAllDashboardByUserUUIDQuery } from "@/store/features/dashboard/dashboardApiSlice";
import { getTrimIntoColumnDateAndTime } from "@/utils/getTrimDateTIme";
import { BsClipboard2DataFill } from "react-icons/bs";
import { formatBytes } from "@/utils/convertByte";

export default function Profile() {
  const { data: user, isLoading } = useGetUserQuery();
  const [fullNameUpdate, setFullNameUpdate] = useState(false);
  const [fullname, setFullname] = useState("");
  const [genderUpdate, setGenderUpdate] = useState(false);
  const [gender, setGender] = useState("");
  const [biographyUpdate, setBiographyUpdate] = useState(false);
  const [biography, setBiography] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phoneUpdate, setPhoneUpdate] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageUpload] = useUploadSingleMutation();
  const [error, setError] = useState('');

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const [updateInfo] = useUpdateUserMutation();

  const handleUpdateFullname = () => {
    updateUserInfo();
    setFullNameUpdate(false);
  };

  const handlePhoneNumber = () => {
    updateUserInfo();
    setPhoneUpdate(false);
  };

  const handleUpdateGender = () => {
    updateUserInfo();
    setGenderUpdate(false);
  };

  const handleBio = () => {
    updateUserInfo();
    setBiographyUpdate(false);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const response = await imageUpload({ data: file });
    setAvatar(response?.data?.filename);
    let data = {
      username: user?.data.username,
      avatar: response?.data?.filename,
    };
    const updateImage = await updateInfo({ data: data, id: user?.data.id });
  };

  const updateUserInfo = async () => {
    let data = {
      username: user?.data.username,
      full_name: fullname,
      gender: gender,
      biography: biography,
      phone_number: phoneNumber,
    };
    const response = await updateInfo({ data: data, id: user?.data.id });
    setError(response?.error?.data?.phone_number)
  };

  // dashboard api 
  const { data: allDashboard } = useGetAllDashboardByUserUUIDQuery({ uuid: user?.data.uuid })


  useEffect(() => {
    setFullname(user?.data.full_name);
    setGender(user?.data.gender);
    setBiography(user?.data.biography);
    setPhoneNumber(user?.data.phone_number);
    setAvatar(user?.data.avatar);
  }, [user]);

  if (isLoading) {
    return <Loading />;
  } else if (!user)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-28">
        <Image
          src={authenticated}
          alt={"authorize"}
          className={"lg:w-1/4 md:w-2/3 w-full"}
        />
        <p
          className={
            "lg:text-2xl md:text-xl text-lg text-primary-color font-bold text-center"
          }
        >
          This page has been not authenticated
        </p>
        <Button
          onClick={() => router.push("/")}
          className={"mt-10 bg-primary-color text-background-color"}
        >
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.155 13.2996L16.2245 18.4558C16.3223 18.5519 16.4003 18.6669 16.454 18.794C16.5076 18.921 16.5359 19.0577 16.5371 19.196C16.5383 19.3344 16.5123 19.4715 16.4608 19.5995C16.4094 19.7276 16.3333 19.8439 16.2371 19.9417C16.141 20.0395 16.0266 20.1168 15.9008 20.1692C15.7749 20.2216 15.6401 20.2479 15.5041 20.2467C15.3681 20.2455 15.2337 20.2168 15.1088 20.1622C14.9838 20.1076 14.8708 20.0282 14.7763 19.9288L8.98283 14.036C8.79083 13.8407 8.68298 13.5758 8.68298 13.2996C8.68298 13.0234 8.79083 12.7585 8.98283 12.5631L14.7763 6.67043C14.8708 6.57094 14.9838 6.49158 15.1088 6.43699C15.2337 6.38239 15.3681 6.35366 15.5041 6.35246C15.6401 6.35125 15.7749 6.37761 15.9008 6.42999C16.0266 6.48236 16.141 6.55971 16.2371 6.65751C16.3333 6.75532 16.4094 6.87162 16.4608 6.99964C16.5123 7.12766 16.5383 7.26482 16.5371 7.40314C16.5359 7.54145 16.5076 7.67813 16.454 7.80522C16.4003 7.93231 16.3223 8.04725 16.2245 8.14334L11.155 13.2996Z"
              fill="white"
            />
          </svg>
          Back to homepage
        </Button>
      </div>
    );

  let content = null;

  if (user) {
    content = (
      <div className="flex min-h-screen flex-col items-center justify-start lg:px-[10%] md:px-[5%] px-3 py-48">
        <div
          className={
            "p-5 w-full text-white min-h-[190px] rounded-2xl bg-[#1E2875]"
          }
        >
          <p className={"text-lg uppercase"}>my profile</p>
        </div>
        <div
          className={
            "lg:flex md:flex justify-center items-start lg:w-3/4 md:w-full w-full gap-5"
          }
        >
          <div
            className={
              "bg-white border-2 border-gray-300 lg:w-1/2 relative md:w-1/2 w-full mb-5 -mt-20 rounded-xl p-7 flex flex-col"
            }
          >
            <div className={"flex justify-center items-center relative"}>
              <div className={"relative"}>
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={generateBashURL(avatar)}
                  alt={"profile_image"}
                  className={"w-[150px] h-[150px] object-cover rounded-full"}
                />
                <label
                  htmlFor="upload-input"
                  className={
                    "absolute hover:bg-secondary-color transition-all cursor-pointer bottom-0 right-0 bg-primary-color p-3 rounded-full"
                  }
                >
                  <span>
                    <svg
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.1208 6.96758L15.9168 5.17157L15.9168 5.17156C16.462 4.62632 16.7346 4.3537 16.8804 4.0596C17.1577 3.50005 17.1577 2.8431 16.8804 2.28354C16.7346 1.98945 16.462 1.71683 15.9168 1.17158L15.9168 1.17157C15.3715 0.626323 15.0989 0.353698 14.8048 0.207962C14.2452 -0.0693207 13.5883 -0.0693207 13.0287 0.207962C12.7346 0.353698 12.462 0.626323 11.9168 1.17157L10.0981 2.99023C11.062 4.64083 12.4481 6.01639 14.1208 6.96758ZM8.64366 4.44469L1.78825 11.3001C1.3558 11.7325 1.13958 11.9488 0.998787 12.215C0.857996 12.4811 0.800957 12.7816 0.686879 13.3824L0.134002 16.2943C0.0731047 16.6151 0.0426559 16.7755 0.134028 16.8687C0.225398 16.962 0.386364 16.9349 0.708293 16.8807H0.708301L3.65659 16.3839C4.28158 16.2786 4.59407 16.2259 4.87112 16.0831C5.14817 15.9402 5.37225 15.7161 5.82041 15.2679L5.82042 15.2679L12.6626 8.42579C11.0409 7.41014 9.6692 6.04785 8.64366 4.44469Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </span>
                </label>
              </div>
            </div>
            <div
              className={
                "border-1 shadow-md mt-10 rounded-lg p-5 flex flex-col justify-start items-start border-gray-200"
              }
            >
              <div
                className={
                  "flex flex-col justify-between gap-5 items-start w-full"
                }
              >
                <div className={"flex flex-col gap-1 w-full"}>
                  <p
                    className={
                      "font-medium w-full text-lg text-description-color"
                    }
                  >
                    Your Name
                  </p>
                  <p className={"text-md text-primary-color font-medium"}>
                    @{user?.data.username}
                  </p>
                  <div className={"flex justify-between items-center"}>
                    {fullNameUpdate ? (
                      <div
                        className={
                          "flex gap-2 justify-between items-center w-full"
                        }
                      >
                        <Input
                          value={fullname}
                          size={"sm"}
                          onValueChange={setFullname}
                        />
                        <button
                          className={
                            "bg-blue-100 hover:bg-blue-200 transition-all p-2 w-14 rounded-lg"
                          }
                          onClick={handleUpdateFullname}
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <div
                        className={
                          "flex gap-2 justify-between items-center w-full"
                        }
                      >
                        <p className={"text-lg font-medium"}>
                          {user?.data.full_name}
                        </p>
                        <button
                          className={
                            "bg-blue-100 hover:bg-blue-200 transition-all p-2 w-14 rounded-lg"
                          }
                          onClick={() => setFullNameUpdate(true)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className={"flex flex-col gap-1 w-full"}>
                  <p
                    className={
                      "font-medium w-full text-lg text-description-color"
                    }
                  >
                    Your Gender
                  </p>
                  <div
                    className={
                      "flex flex-row gap-5 justify-between w-full items-center "
                    }
                  >
                    {genderUpdate ? (
                      <div
                        className={
                          "flex gap-2 justify-between items-center w-full"
                        }
                      >
                        <Select
                          aria-label="Select"
                          selectedKeys={[gender]}
                          onChange={handleGender}
                          label="Select gender"
                          className="max-w-xs"
                        >
                          <SelectItem key={"Male"} value={"Male"}>
                            Male
                          </SelectItem>
                          <SelectItem key={"Female"} value={"Female"}>
                            Female
                          </SelectItem>
                          <SelectItem key={"Other"} value={"Other"}>
                            Other
                          </SelectItem>
                        </Select>
                        <button
                          className={
                            "bg-blue-100 hover:bg-blue-200 transition-all p-2 w-14 rounded-lg"
                          }
                          onClick={handleUpdateGender}
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <div
                        className={
                          "flex gap-2 justify-between items-center w-full"
                        }
                      >
                        <p className={"text-lg font-medium"}>{gender}</p>
                        <button
                          className={
                            "bg-blue-100 hover:bg-blue-200 transition-all p-2 w-14 rounded-lg"
                          }
                          onClick={() => setGenderUpdate(true)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className={"flex flex-col gap-1 w-full"}>
                  <p
                    className={
                      "font-medium w-full text-lg text-description-color"
                    }
                  >
                    Your Email
                  </p>
                  <div
                    className={
                      "flex flex-row justify-between gap-5 w-full items-center "
                    }
                  >
                    <p className={"text-primary-color text-lg font-semibold"}>
                      {user?.data.email}
                    </p>
                  </div>
                </div>
                <div className={"flex flex-col gap-1 w-full"}>
                  <p
                    className={
                      "font-medium w-full text-lg text-description-color"
                    }
                  >
                    Your Phone Number
                  </p>
                  <div
                    className={
                      "flex flex-row gap-5 justify-between w-full items-center "
                    }
                  >
                    {!phoneUpdate ? (
                      <>
                        <p className={"text-lg font-medium"}>{phoneNumber}</p>
                        <button
                          className={
                            "bg-blue-100 hover:bg-blue-200 transition-all p-2 w-14 rounded-lg"
                          }
                          onClick={() => setPhoneUpdate(true)}
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <>
                        <Input
                          size={"sm"}
                          type={"number"}
                          value={phoneNumber}
                          onValueChange={setPhoneNumber}
                        />
                        <button
                          className={
                            "bg-blue-100 hover:bg-blue-200 transition-all p-2 w-14 rounded-lg"
                          }
                          onClick={handlePhoneNumber}
                        >
                          Done
                        </button>
                      </>
                    )}
                  </div>
                  <p className="text-red-400">{error}</p>
                </div>
              </div>
            </div>
            <div
              className={
                "border-1 shadow-md mt-10 rounded-lg p-5 flex flex-col justify-start items-start border-gray-200"
              }
            >
              <div className={"flex justify-between items-center w-full"}>
                <h4 className={"text-text-color"}>
                  About <span className={"text-primary-color"}>{fullname}</span>
                </h4>
                {!biographyUpdate ? (
                  <button
                    onClick={() => setBiographyUpdate(true)}
                    className={"text-primary-color"}
                  >
                    <FaPencilAlt />
                  </button>
                ) : (
                  <button onClick={handleBio}>Done</button>
                )}
              </div>
              <div className={"text-md text-text-color mt-5 w-full"}>
                {biographyUpdate ? (
                  <Textarea
                    size={"lg"}
                    placeholder={"Texting...."}
                    value={biography}
                    onValueChange={setBiography}
                  />
                ) : (
                  <p>{biography}</p>
                )}
              </div>
            </div>
            <div
              className={
                "border-1 shadow-md mt-10 rounded-lg p-5 flex flex-col justify-start items-start border-gray-200"
              }
            >
              <p
                className={
                  "text-xl w-full font-bold text-text-color capitalize"
                }
              >
                Storage usage
              </p>
              <div className={"w-full flex justify-between items-center mt-5"}>
                <p className={"font-semibold text-lg text-text-color"}>Free</p>
                <div
                  className={
                    "text-md text-text-color bg-green-300 px-6 rounded-full py-0.5"
                  }
                >
                  1 GB
                </div>
              </div>
              <div className={"w-full flex justify-between items-center mt-5"}>
                <p className={"font-semibold text-lg text-text-color"}>Used</p>
                <div
                  className={
                    `text-md text-text-color ${user?.data.storage_data < 819200 ? 'bg-red-300' : 'bg-gray-100'} px-6 rounded-full py-0.5`
                  }
                >
                  {formatBytes(user?.data.storage_data)}
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              "lg:w-1/2 relative md:w-1/2 w-full mb-5 lg:-mt-20 md:-mt-20 mt-0 rounded-xl flex flex-col"
            }
          >
            <div
              className={
                "bg-white max-h-[267px] overflow-y-scroll border-2 shadow-md rounded-lg p-5 flex flex-col justify-start items-start border-gray-200"
              }
            >
              <p className={"mb-5 text-lg text-primary-color font-semibold"}>
                Analysis
              </p>
              <div className={"grid gap-3 w-full"}>
                {user?.data.analysis.map((item, index) => (
                  <Link
                    href={`/board/analysis/${item.uuid}`}
                    key={item.id}
                    className={`border-2 border-gray-200 rounded-xl flex justify-start items-center gap-3 shadow-sm w-full hover:bg-primary-color transition-all hover:text-white capitalize text-lg`}
                  >
                    <div
                      style={{ backgroundColor: getRandomColor() }}
                      className={`w-[80px] h-[80px] rounded-s-xl flex justify-center items-center text-white`}
                    >
                      <FaStar className="text-2xl" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-lg">{item.title}</p>
                      <p className="text-sm">{item.model_name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div
              className={
                "bg-white min-h-[383px] border-2 shadow-md mt-5 rounded-lg p-5 flex flex-col justify-start items-start border-gray-200"
              }
            >
              Dashboard
              <div className="w-full grid gap-3 mt-5">
                {
                  allDashboard?.results.map((item, index) => (
                    <Link
                      href={`/board/dashboard/${item.uuid}`}
                      key={item.id}
                      className={`border-2 border-gray-200 rounded-xl flex justify-start items-center gap-3 shadow-sm w-full hover:bg-primary-color transition-all hover:text-white capitalize text-lg`}
                    >
                      <div
                        style={{ backgroundColor: getRandomColor() }}
                        className={`w-[80px] h-[80px] rounded-s-xl flex justify-center items-center text-white`}
                      >
                        <BsClipboard2DataFill className="text-2xl" />
                      </div>
                      <div className="grid gap-1">
                        <p className="text-lg">{item.title}</p>
                        <p className="text-sm">{getTrimIntoColumnDateAndTime(item.created_at)}</p>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
