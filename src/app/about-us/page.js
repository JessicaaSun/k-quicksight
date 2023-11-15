import React from 'react';
import Image from "next/image";
import mission from '@assets/images/mission_(2).png'
import vision from '@assets/images/vision_(2).png'
import Reksmey from '@assets/teams/reksmey.png'
import tara from '@assets/teams/kitTara.png'
import jessica from '@assets/teams/jessica.png'
import ChenTo from '@assets/teams/chento.png'
import SoBun from '@assets/teams/sobon.png'
import SeangLeng from '@assets/teams/seangleng.png'
import Sophearum from '@assets/teams/phearum.png'
import Link from "next/link";
import {Tooltip} from "@nextui-org/react";

export default function AboutUs(){
    const data = [
        {
            image: mission,
            title: "Our Mission",
            description: "K-QuickSight is on a mission to redefine data analysis. We're dedicated to delivering accessible, powerful tools that enable individuals and organizations, regardless of their technical proficiency, to unlock their data's full potential. Our commitment is to make data analysis an empowering journey for all."
        },
        {
            image: vision,
            title: "Our Vision",
            description: "At K-QuickSight, we envision democratizing data analysis, making it accessible and transformative for all. We aim to empower businesses with intuitive and advanced tools, facilitating data-driven decision-making and fostering success."
        }
    ]
    const members = [
        {
            profile: jessica,
            name: "Sun Jessica",
            position: "Fullstack",
            facebook: 'https://www.facebook.com/profile.php?id=100010500511225',
            instagram: 'https://www.instagram.com/jessblueo3o/',
            github: 'https://github.com/JessicaaSun'
        },
        {
            profile: ChenTo,
            name: "Chea Chento",
            position: "Backend",
            facebook: '',
            instagram: '',
            github: ''
        },{
            profile: SoBun,
            name: "Phon Sobon",
            position: "Frontend",
            facebook: 'https://www.facebook.com/sobon.phon/?_rdc=1&_rdr',
            instagram: '',
            github: 'https://github.com/PhonSobon?tab=repositories'
        },
        {
            profile: SeangLeng,
            name: "Seng SeangLeng",
            position: "Frontend",
            facebook: 'https://www.facebook.com/profile.php?id=100086488516436',
            instagram: 'https://www.instagram.com/chheng_jenzy/',
            github: 'https://github.com/SeangLeng'
        },
        {
            profile: Sophearum,
            name: "Sorn Sophearum",
            position: "Frontend",
            facebook: 'https://web.facebook.com/sophearum.sorn',
            instagram: 'https://www.instagram.com/rum_sorn/?hl=en',
            github: 'https://github.com/sirbluee'
        },
    ]
    return (
        <section className={'py-32 flex flex-col items-center'}>
            <div className={'flex gap-5 justify-center items-center pt-10'}>
                <svg width="45" height="35" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M43.125 0H6.875C5.83945 0 5 0.979362 5 2.1875V2.91667H1.875C0.839453 2.91667 0 3.89603 0 5.10417V29.8958C0 32.7148 1.95875 35 4.375 35H41.25C43.3211 35 45 33.0413 45 30.625V2.1875C45 0.979362 44.1605 0 43.125 0ZM4.375 30.625C4.20924 30.625 4.05027 30.5482 3.93306 30.4114C3.81585 30.2747 3.75 30.0892 3.75 29.8958V7.29167H5V29.8958C5 30.0892 4.93415 30.2747 4.81694 30.4114C4.69973 30.5482 4.54076 30.625 4.375 30.625ZM22.8125 29.1667H10.9375C10.4198 29.1667 10 28.6769 10 28.0729V27.3438C10 26.7397 10.4198 26.25 10.9375 26.25H22.8125C23.3302 26.25 23.75 26.7397 23.75 27.3438V28.0729C23.75 28.6769 23.3302 29.1667 22.8125 29.1667ZM39.0625 29.1667H27.1875C26.6698 29.1667 26.25 28.6769 26.25 28.0729V27.3438C26.25 26.7397 26.6698 26.25 27.1875 26.25H39.0625C39.5802 26.25 40 26.7397 40 27.3438V28.0729C40 28.6769 39.5802 29.1667 39.0625 29.1667ZM22.8125 20.4167H10.9375C10.4198 20.4167 10 19.9269 10 19.3229V18.5938C10 17.9897 10.4198 17.5 10.9375 17.5H22.8125C23.3302 17.5 23.75 17.9897 23.75 18.5938V19.3229C23.75 19.9269 23.3302 20.4167 22.8125 20.4167ZM39.0625 20.4167H27.1875C26.6698 20.4167 26.25 19.9269 26.25 19.3229V18.5938C26.25 17.9897 26.6698 17.5 27.1875 17.5H39.0625C39.5802 17.5 40 17.9897 40 18.5938V19.3229C40 19.9269 39.5802 20.4167 39.0625 20.4167ZM39.0625 11.6667H10.9375C10.4198 11.6667 10 11.1769 10 10.5729V6.92708C10 6.32306 10.4198 5.83333 10.9375 5.83333H39.0625C39.5802 5.83333 40 6.32306 40 6.92708V10.5729C40 11.1769 39.5802 11.6667 39.0625 11.6667Z" fill="#0346A5"/>
                </svg>
                <h1 className={'text-primary-color capitalize'}>
                    about k-quicksight
                </h1>
            </div>
            <div className={'flex justify-center items-center'}>
                <p className={'text-description-color text-center mt-5 text-lg lg:w-1/2 md:w-2/3'}>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </p>
            </div>
            <Image src="/assets/images/about-hero.png" width={820} height={820} alt={'about'}/>
            <div className={'my-10 lg:px-[15%] md:px-[5%] px-5'}>
                <p className={'text-4xl capitalize text-primary-color font-bold text-center my-10'}>Mission and vision</p>
                {
                    data.map((e, index) => (
                        <div key={index} className={`lg:flex w-full md:flex justify-center gap-5 items-center ${index === 1 ? "flex-row-reverse" : ""}`}>
                            <Image src={e.image} alt={e.title} className={'lg:w-1/3 md:w-1/3'}/>
                            <div className={`${index === 1 ? "text-right" : ""}`}>
                                <h3 className={'text-primary-color'}>{e.title}</h3>
                                <p className={'text-description-color mt-4'}>{e.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className={'px-[10%]'}>
                <p className={'text-4xl text-primary-color font-bold text-center my-16'}>Our mentors</p>
                <div className={'lg:flex md:flex w-full justify-center items-center'}>
                    <div className={'lg:flex md:flex justify-center items-center gap-10 mt-10'}>
                        <div className={'lg:w-1/3 md:w-2/3'}>

                            <Image src={Reksmey} alt={'instructor RakSmey'} />
                            <h3 className={'text-center my-5 text-text-color'}>Ms. Mom Reksmey</h3>
                        </div>
                        <div className={'lg:w-1/3 md:w-2/3'}>
                            <Image src={tara} alt={'instructor Tara'} />
                            <h3 className={'text-center my-5 text-text-color'}>Mr. Kit Tara</h3>

                        </div>
                    </div>
                    <p className={'lg:w-1/2 text-lg text-description-color'}>
                        Meet the driving force behind our success. <span className={'font-semibold'}>Our mentors</span> are experts in data analysis and technology. They shape our vision, ensuring we deliver excellence in data analytics
                    </p>
                </div>
                <p className={'text-4xl text-primary-color font-bold text-center my-20'}>Our Members</p>
                <div className={'flex flex-wrap justify-around items-center'}>
                    {
                        members.map((e, index) => (
                            <div key={index} className={'lg:w-1/4 md:w-1/3 m-10'}>
                                <Image src={e.profile} alt={e.name} />
                                <h3 className={'text-text-color text-center capitalize'}>{e.name}</h3>
                                <p className={'text-primary-color font-semibold text-center text-lg mt-2'}>{e.position}</p>
                                <div className={'flex gap-[33px] justify-center items-center mt-5'}>
                                    <Tooltip showArrow={true} content={`${e.name} facebook`}>
                                        <Link target="_blank" href={e.facebook} className={'hover:scale-110 transition-all'}>
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.5898 0H2.40234C1.78074 0 1.1846 0.24693 0.745062 0.686469C0.305524 1.12601 0.0585938 1.72215 0.0585938 2.34375L0.0585938 19.5312C0.0585938 20.1529 0.305524 20.749 0.745062 21.1885C1.1846 21.6281 1.78074 21.875 2.40234 21.875H9.104V14.438H6.02783V10.9375H9.104V8.26953C9.104 5.23486 10.9106 3.55859 13.6777 3.55859C15.0029 3.55859 16.3887 3.79492 16.3887 3.79492V6.77344H14.8618C13.3574 6.77344 12.8882 7.70703 12.8882 8.66455V10.9375H16.2466L15.7095 14.438H12.8882V21.875H19.5898C20.2114 21.875 20.8076 21.6281 21.2471 21.1885C21.6867 20.749 21.9336 20.1529 21.9336 19.5312V2.34375C21.9336 1.72215 21.6867 1.12601 21.2471 0.686469C20.8076 0.24693 20.2114 0 19.5898 0Z" fill="#46526E" fillOpacity="0.69"/>
                                            </svg>
                                        </Link>
                                    </Tooltip>

                                    <Tooltip showArrow={true} content={`${e.name} Instagram`}>
                                        <Link target="_blank" href={e.instagram} className={'hover:scale-110 transition-all'}>
                                            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.8796 5.33081C8.77417 5.33081 6.26929 7.83569 6.26929 10.9412C6.26929 14.0466 8.77417 16.5515 11.8796 16.5515C14.9851 16.5515 17.49 14.0466 17.49 10.9412C17.49 7.83569 14.9851 5.33081 11.8796 5.33081ZM11.8796 14.5886C9.8728 14.5886 8.23218 12.9529 8.23218 10.9412C8.23218 8.92944 9.86792 7.2937 11.8796 7.2937C13.8914 7.2937 15.5271 8.92944 15.5271 10.9412C15.5271 12.9529 13.8865 14.5886 11.8796 14.5886ZM19.0281 5.10132C19.0281 5.82886 18.4421 6.40991 17.7195 6.40991C16.9919 6.40991 16.4109 5.82397 16.4109 5.10132C16.4109 4.37866 16.9968 3.79272 17.7195 3.79272C18.4421 3.79272 19.0281 4.37866 19.0281 5.10132ZM22.7439 6.42944C22.6609 4.67651 22.2605 3.12378 20.9763 1.84448C19.697 0.565185 18.1443 0.164795 16.3914 0.0769043C14.5847 -0.0256348 9.16968 -0.0256348 7.36304 0.0769043C5.61499 0.159912 4.06226 0.560303 2.77808 1.8396C1.4939 3.1189 1.09839 4.67163 1.0105 6.42456C0.907959 8.2312 0.907959 13.6462 1.0105 15.4529C1.09351 17.2058 1.4939 18.7585 2.77808 20.0378C4.06226 21.3171 5.61011 21.7175 7.36304 21.8054C9.16968 21.908 14.5847 21.908 16.3914 21.8054C18.1443 21.7224 19.697 21.322 20.9763 20.0378C22.2556 18.7585 22.656 17.2058 22.7439 15.4529C22.8464 13.6462 22.8464 8.23608 22.7439 6.42944ZM20.4099 17.3914C20.0291 18.3484 19.2917 19.0857 18.3298 19.4714C16.8894 20.0427 13.4714 19.9109 11.8796 19.9109C10.2878 19.9109 6.86499 20.0378 5.42944 19.4714C4.47241 19.0906 3.73511 18.3533 3.34937 17.3914C2.77808 15.9509 2.90991 12.533 2.90991 10.9412C2.90991 9.34937 2.78296 5.92651 3.34937 4.49097C3.73022 3.53394 4.46753 2.79663 5.42944 2.41089C6.86987 1.8396 10.2878 1.97144 11.8796 1.97144C13.4714 1.97144 16.8943 1.84448 18.3298 2.41089C19.2869 2.79175 20.0242 3.52905 20.4099 4.49097C20.9812 5.9314 20.8494 9.34937 20.8494 10.9412C20.8494 12.533 20.9812 15.9558 20.4099 17.3914Z" fill="#46526E" fillOpacity="0.69"/>
                                            </svg>
                                        </Link>
                                    </Tooltip>

                                    <Tooltip showArrow={true} content={`${e.name} GitHub`}>
                                        <Link target="_blank" href={e.github} className={'hover:scale-110 transition-all'}>
                                            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.3521 0H3.16455C1.87061 0 0.820801 1.0498 0.820801 2.34375V19.5312C0.820801 20.8252 1.87061 21.875 3.16455 21.875H20.3521C21.646 21.875 22.6958 20.8252 22.6958 19.5312V2.34375C22.6958 1.0498 21.646 0 20.3521 0ZM14.3608 18.7354C13.9507 18.8086 13.7993 18.5547 13.7993 18.3447C13.7993 18.0811 13.8091 16.7334 13.8091 15.6445C13.8091 14.8828 13.5552 14.3994 13.2573 14.1455C15.064 13.9453 16.9683 13.6963 16.9683 10.5762C16.9683 9.6875 16.6509 9.24316 16.1333 8.67188C16.2163 8.46191 16.4946 7.59766 16.0503 6.47461C15.3716 6.26465 13.8188 7.34863 13.8188 7.34863C13.1743 7.16797 12.4761 7.07519 11.7876 7.07519C11.0991 7.07519 10.4009 7.16797 9.75635 7.34863C9.75635 7.34863 8.20361 6.26465 7.5249 6.47461C7.08057 7.59277 7.354 8.45703 7.4419 8.67188C6.92432 9.24316 6.68018 9.6875 6.68018 10.5762C6.68018 13.6816 8.50146 13.9453 10.3081 14.1455C10.0737 14.3555 9.86377 14.7168 9.79053 15.2344C9.32666 15.4443 8.14014 15.8057 7.43213 14.5557C6.98779 13.7842 6.18701 13.7207 6.18701 13.7207C5.396 13.7109 6.1333 14.2188 6.1333 14.2188C6.66064 14.4629 7.03174 15.4004 7.03174 15.4004C7.50537 16.8506 9.771 16.3623 9.771 16.3623C9.771 17.041 9.78076 18.1445 9.78076 18.3447C9.78076 18.5547 9.63428 18.8086 9.21924 18.7354C5.99658 17.6562 3.74072 14.5898 3.74072 11.0059C3.74072 6.52344 7.16846 3.12012 11.6509 3.12012C16.1333 3.12012 19.7661 6.52344 19.7661 11.0059C19.771 14.5898 17.5835 17.6611 14.3608 18.7354ZM9.5708 15.752C9.47803 15.7715 9.39014 15.7324 9.38037 15.6689C9.37061 15.5957 9.43408 15.5322 9.52686 15.5127C9.61963 15.5029 9.70752 15.542 9.71729 15.6055C9.73193 15.6689 9.66846 15.7324 9.5708 15.752ZM9.10693 15.708C9.10693 15.7715 9.03369 15.8252 8.93604 15.8252C8.82861 15.835 8.75537 15.7813 8.75537 15.708C8.75537 15.6445 8.82861 15.5908 8.92627 15.5908C9.01904 15.5811 9.10693 15.6348 9.10693 15.708ZM8.43799 15.6543C8.41846 15.7178 8.3208 15.7471 8.23779 15.7178C8.14502 15.6982 8.08154 15.625 8.10107 15.5615C8.12061 15.498 8.21826 15.4688 8.30127 15.4883C8.39893 15.5176 8.4624 15.5908 8.43799 15.6543ZM7.8374 15.3906C7.79346 15.4443 7.70068 15.4346 7.62744 15.3613C7.5542 15.2979 7.53467 15.2051 7.5835 15.1611C7.62744 15.1074 7.72021 15.1172 7.79346 15.1904C7.85693 15.2539 7.88135 15.3516 7.8374 15.3906ZM7.39307 14.9463C7.34912 14.9756 7.26611 14.9463 7.2124 14.873C7.15869 14.7998 7.15869 14.7168 7.2124 14.6826C7.26611 14.6387 7.34912 14.6729 7.39307 14.7461C7.44678 14.8193 7.44678 14.9072 7.39307 14.9463ZM7.07568 14.4727C7.03174 14.5166 6.9585 14.4922 6.90479 14.4434C6.85107 14.3799 6.84131 14.3066 6.88525 14.2725C6.9292 14.2285 7.00244 14.2529 7.05615 14.3018C7.10986 14.3652 7.11963 14.4385 7.07568 14.4727ZM6.74854 14.1113C6.729 14.1553 6.66553 14.165 6.61182 14.1309C6.54834 14.1016 6.51904 14.0479 6.53857 14.0039C6.55811 13.9746 6.61182 13.96 6.67529 13.9844C6.73877 14.0186 6.76807 14.0723 6.74854 14.1113Z" fill="#46526E" fillOpacity="0.69"/>
                                            </svg>
                                        </Link>
                                    </Tooltip>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
