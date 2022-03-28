import styled from "styled-components";

const AnimatedNumberView = ({value, fontSize, fontFamily, fontColor, fontWeight}) => {
    const getAnimationDuration = () => {
        if (value === 0) return 0;
        return  (value * 5 / 100.00) + 's';
    }

    return (
        <NumberView value={value} fontColor={fontColor} duration={getAnimationDuration()}  fontSize={fontSize} fontFamily={fontFamily} fontWeight={fontWeight}/>
    )
}

const NumberView = styled.span`
    --num: ${props => props.value};
    @property --num {
        syntax: "<integer>";
        initial-value: 0;
        inherits: false;
    }

    transition: --num ${props => props.duration};
    counter-set: num var(--num);
    color: ${props => props.fontColor};
    font: ${props => props.fontWeight} ${props => props.fontSize} ${props => props.fontFamily};

    &::after {
        content: counter(num);
    }
`

export default AnimatedNumberView;