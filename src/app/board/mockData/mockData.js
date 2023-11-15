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