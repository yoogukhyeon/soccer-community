import styled from 'styled-components';
import CourseVideo from '@/components/course/CourseVideo';
import CourseList from '@/components/course/CourseList';

export default function Course() {
    return (
        <CourseWrap>
            <div>
                <CourseVideo />
                <CourseList />
            </div>
        </CourseWrap>
    );
}

const CourseWrap = styled.div`
    position: fixed;
    width: 100vw;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    padding: 0 8px;

    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media screen and (max-width: 768px) {
            & {
                flex-direction: column;
                align-self: auto;
            }
        }
    }
`;
