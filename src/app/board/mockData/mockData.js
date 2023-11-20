import dashboard_1 from '@assets/images/dashboard_1.jpg'
import dashboard_2 from '@assets/images/dashboard_2.png'

export const mockData = {
    dataset: [
        {
            filename: 'survey',
            fileType: 'CSV',
            createDate: '01/11/2023',
            fileSize: '10.98KB',
            url: '/board/dataset/e6271042-8359-11ee-b962-0242ac120002'
        }
    ],
    analysis: [
        {
            filename: 'UnKnown',
            createDate: '01/11/2023',
            fileSize: '14.98KB',
            url: '/board/analysis/c67f7ec8-8359-11ee-b962-0242ac120002'
        },
        {
            filename: 'Survey cleaning',
            createDate: '11/11/2023',
            fileSize: '12.89KB',
            url: '/board/analysis/ca2dd6dc-8359-11ee-b962-0242ac120002'
        }
    ],
    dashboard: [
        {
            thumbnail: dashboard_1,
            name: 'Survey dashboard',
            createdAt: '11/01/2023',
            url: '/board/dashboard/58e357ba-835c-11ee-b962-0242ac120002'
        },
        {
            thumbnail: dashboard_2,
            name: 'Sale dashboard',
            createdAt: '09/01/2023',
            url: '/board/dashboard/62e4adb8-835c-11ee-b962-0242ac120002'
        }
    ]
}

export const dataType = [
    {
        id: 1,
        value: '',
        label: 'All Files'
    },
    {
        id: 2,
        value: 'txt',
        label: 'txt'
    },
    {
        id: 3,
        value: 'xlsx',
        label: 'xlsx'
    },
    {
        id: 4,
        value: 'json',
        label: 'json'
    },
    {
        id: 5,
        value: 'csv',
        label: 'csv'
    },
]

export const file_dataset = [
    {
        title: 'survey',
        fileType: 'CSV',
        createAt: '01/11/2023',
        size: '14.89KB',
        url: '/board/dataset/564837b6-838c-11ee-b962-0242ac120002'
    },
    {
        title: 'Test_survey',
        fileType: 'XLSX',
        createAt: '02/10/2023',
        size: '1.89KB',
        url: '/board/dataset/5c13419a-838c-11ee-b962-0242ac120002'
    },
    {
        title: 'Sample_dataset',
        fileType: 'CSV',
        createAt: '01/10/2023',
        size: '1.87KB',
        url: '/board/dataset/5ed8e088-838c-11ee-b962-0242ac120002'
    },
]

export const sample_dataset = [
    {
        title: 'short_course',
        fileType: 'CSV',
        createAt: '01/11/2023',
        size: '10.89KB',
        url: '/board/dataset/564837b6-838c-11ee-b962-0242ac120002',
        uuid: '3ca0e936-85e2-11ee-b9d1-0242ac120002'
    },
    {
        title: 'cambodia income',
        fileType: 'XLSX',
        createAt: '02/10/2023',
        size: '10.49KB',
        url: '/board/dataset/5c13419a-838c-11ee-b962-0242ac120002',
        uuid: '33b77182-85e2-11ee-b9d1-0242ac120002'
    },
]
export const analysis_sample = [
    {
        filename: 'Short course demand 2024 prediction',
        createDate: '01/11/2023',
        fileSize: '14.98KB',
        url: '/board/analysis/c67f7ec8-8359-11ee-b962-0242ac120002'
    },
    {
        filename: 'Relationship between income & soending',
        createDate: '11/11/2023',
        fileSize: '12.89KB',
        url: '/board/analysis/ca2dd6dc-8359-11ee-b962-0242ac120002'
    },
]

export const users = [
    {
        id: 1,
        name: "Tony Reichert",
        role: "CEO",
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
        email: "tony.reichert@example.com",
        isMember: false
    },
    {
        id: 2,
        name: "Zoey Lang",
        role: "Tech Lead",
        team: "Development",
        status: "paused",
        age: "25",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
        email: "zoey.lang@example.com",
        isMember: false
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: "Sr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
        email: "jane.fisher@example.com",
        isMember: false
    },
    {
        id: 4,
        name: "William Howard",
        role: "C.M.",
        team: "Marketing",
        status: "vacation",
        age: "28",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
        email: "william.howard@example.com",
        isMember: false
    },
    {
        id: 5,
        name: "Kristen Copper",
        role: "S. Manager",
        team: "Sales",
        status: "active",
        age: "24",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
        email: "kristen.cooper@example.com",
        isMember: false
    },
    {
        id: 6,
        name: "Brian Kim",
        role: "P. Manager",
        team: "Management",
        age: "29",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
        email: "brian.kim@example.com",
        status: "Active",
        isMember: false
    },
    {
        id: 7,
        name: "Michael Hunt",
        role: "Designer",
        team: "Design",
        status: "paused",
        age: "27",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
        email: "michael.hunt@example.com",
        isMember: false
    },
    {
        id: 8,
        name: "Samantha Brooks",
        role: "HR Manager",
        team: "HR",
        status: "active",
        age: "31",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
        email: "samantha.brooks@example.com",
        isMember: false
    },
    {
        id: 9,
        name: "Frank Harrison",
        role: "F. Manager",
        team: "Finance",
        status: "vacation",
        age: "33",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png",
        email: "frank.harrison@example.com",
        isMember: false
    },
    {
        id: 10,
        name: "Emma Adams",
        role: "Ops Manager",
        team: "Operations",
        status: "active",
        age: "35",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
        email: "emma.adams@example.com",
        isMember: false
    },
    {
        id: 11,
        name: "Brandon Stevens",
        role: "Jr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/7.png",
        email: "brandon.stevens@example.com",
        isMember: false
    },
    {
        id: 12,
        name: "Megan Richards",
        role: "P. Manager",
        team: "Product",
        status: "paused",
        age: "28",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png",
        email: "megan.richards@example.com",
        isMember: false
    },
    {
        id: 13,
        name: "Oliver Scott",
        role: "S. Manager",
        team: "Security",
        status: "active",
        age: "37",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/8.png",
        email: "oliver.scott@example.com",
        isMember: false
    },
    {
        id: 14,
        name: "Grace Allen",
        role: "M. Specialist",
        team: "Marketing",
        status: "active",
        age: "30",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/8.png",
        email: "grace.allen@example.com",
        isMember: false
    },
    {
        id: 15,
        name: "Noah Carter",
        role: "IT Specialist",
        team: "I. Technology",
        status: "paused",
        age: "31",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/9.png",
        email: "noah.carter@example.com",
        isMember: false
    },
    {
        id: 16,
        name: "Ava Perez",
        role: "Manager",
        team: "Sales",
        status: "active",
        age: "29",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/9.png",
        email: "ava.perez@example.com",
        isMember: false
    },
    {
        id: 17,
        name: "Liam Johnson",
        role: "Data Analyst",
        team: "Analysis",
        status: "active",
        age: "28",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/11.png",
        email: "liam.johnson@example.com",
        isMember: false
    },
    {
        id: 18,
        name: "Sophia Taylor",
        role: "QA Analyst",
        team: "Testing",
        status: "active",
        age: "27",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/11.png",
        email: "sophia.taylor@example.com",
        isMember: false
    },
    {
        id: 19,
        name: "Lucas Harris",
        role: "Administrator",
        team: "Information Technology",
        status: "paused",
        age: "32",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/12.png",
        email: "lucas.harris@example.com",
        isMember: false
    },
    {
        id: 20,
        name: "Mia Robinson",
        role: "Coordinator",
        team: "Operations",
        status: "active",
        age: "26",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/12.png",
        email: "mia.robinson@example.com",
        isMember: false
    },
];
