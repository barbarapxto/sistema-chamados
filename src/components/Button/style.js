import styled from 'styled-components';

export const Button = styled.button`
    border-radius: 4px;
    border: 0;
    font-size: 1.02rem;
    font-weight: bold;
    margin-top: 8px;
    padding: 8px 16px;
    transition: all 0.5s ease;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;

    ${(props) =>
        props.load &&
        `
        svg{
            animation: rotate linear 1s infinite;
        }

        @keyframes rotate{
            from{
                transform: rotate(0deg);
            }
            to{
                transform: rotate(-360deg);
            }
        }

    `}

    ${(props) =>
        props.primary &&
        `
            background-color: var(--blue);
            color: #fff;

            &:hover{
                background-color: var(--blue-hover);
            }
        `}
    ${(props) =>
        props.secondary &&
        `
            background-color: var(--gray);
            color: #121212;

            &:hover{
                background-color: var(--dark-gray);
            }
        `}
    ${(props) =>
        props.green &&
        `
                background-color: var(--green);
                color: #fff;

                &:hover{
                background-color: var(--dark-green);
            }
            `}

    ${(props) =>
        props.orange &&
        `
                background-color: var(--orange);
                color: #fff;

                &:hover{
                background-color: var(--dark-orange);
            }
            `}

    ${(props) =>
        props.red &&
        `
                    background-color: var(--red);
                    color: #fff;

                    &:hover{
                        background-color: var(--dark-red);
                    }
                `};
    ${(props) =>
        props.redOutline &&
        `
                    border: 1px solid var(--red);
                    color: var(--red);

                    &:hover{
                        background-color: var(--red);
                        color: #fff;
                    }
                `};
`;
