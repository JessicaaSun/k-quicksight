import dashboard_1 from '@assets/images/dashboard_1.jpg'
import dashboard_2 from '@assets/images/dashboard_2.png'

export const mockData = {
    dataset: [
        {
            filename: 'survey',
            fileType: 'CSV',
            createDate: '01/11/2023',
            fileSize: '10.98 KB',
            url: '/board/dataset/e6271042-8359-11ee-b962-0242ac120002'
        }
    ],
    analysis: [
        {
            filename: 'UnKnown',
            createDate: '01/11/2023',
            fileSize: '14.98 KB',
            url: '/board/analysis/c67f7ec8-8359-11ee-b962-0242ac120002'
        },
        {
            filename: 'Survey cleaning',
            createDate: '11/11/2023',
            fileSize: '12.89 KB',
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
        value: 'CSV',
        label: 'CSV'
    },
    {
        id: 2,
        value: 'TXT',
        label: 'TXT'
    },
    {
        id: 3,
        value: 'XLSX',
        label: 'EXCEL'
    },
    {
        id: 4,
        value: 'JSON',
        label: 'JSON'
    },
]

export const file_dataset = [
    {
        title: 'survey',
        fileType: 'CSV',
        createAt: '01/11/2023',
        size: '14.89 KB',
        url: '/board/dataset/564837b6-838c-11ee-b962-0242ac120002'
    },
    {
        title: 'Test_survey',
        fileType: 'XLSX',
        createAt: '02/10/2023',
        size: '1.89 KB',
        url: '/board/dataset/5c13419a-838c-11ee-b962-0242ac120002'
    },
    {
        title: 'Sample_dataset',
        fileType: 'CSV',
        createAt: '01/10/2023',
        size: '1.87 KB',
        url: '/board/dataset/5ed8e088-838c-11ee-b962-0242ac120002'
    },
]

export const sample_dataset = [
    {
        title: 'short_course',
        fileType: 'CSV',
        createAt: '01/11/2023',
        size: '10.89 KB',
        url: '/board/dataset/564837b6-838c-11ee-b962-0242ac120002'
    },
    {
        title: 'cambodia income',
        fileType: 'XLSX',
        createAt: '02/10/2023',
        size: '10.49 KB',
        url: '/board/dataset/5c13419a-838c-11ee-b962-0242ac120002'
    },
]
export const analysis_sample = [
    {
        filename: 'Short course demand 2024 prediction',
        createDate: '01/11/2023',
        fileSize: '14.98 KB',
        url: '/board/analysis/c67f7ec8-8359-11ee-b962-0242ac120002'
    },
    {
        filename: 'Relationship between income & soending',
        createDate: '11/11/2023',
        fileSize: '12.89 KB',
        url: '/board/analysis/ca2dd6dc-8359-11ee-b962-0242ac120002'
    },
]