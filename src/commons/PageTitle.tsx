import { Title1 } from "@fluentui/react-components";

interface PageTitleProps {
    children: React.ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
    return <Title1>{children}</Title1>;
}
