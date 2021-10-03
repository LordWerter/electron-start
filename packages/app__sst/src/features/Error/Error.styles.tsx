import styled from '@emotion/styled';

export const CWrap = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding-top: 20%;
`;

export const Title = styled.h1`
    font-size: 24px;
    color: #dd0000;
    line-height: 1.14;
    font-weight: bold;
    text-align: center;
    white-space: pre-line;
    padding: 0 100px;
`;

export const Text = styled.p`
    font-size: 24px;
    color: #ffffff;
    line-height: 1.14;
    font-weight: normal;
    text-align: center;
    white-space: pre-line;
    padding: 0 100px;
    padding: 0 100px;
    margin: 0;
`;

export const Logo = styled.div<{ height: string; source: string }>`
    display: block;
    height: ${(props: any) => props.height};
    background-image: url('${(props: any) => props.source}');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    margin-bottom: 50px;
`;

export const Image = styled.div<{source: string}>`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url('${(props: any) => props.source}');
    background-position: center bottom;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: -1;
`;
