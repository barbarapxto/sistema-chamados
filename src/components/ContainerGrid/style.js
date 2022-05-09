import styled from 'styled-components';

export const ContainerGrid = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 0px 0px;

    @media screen and (max-width: 768px) {
        grid-template-columns: 100%;
    }
`;
