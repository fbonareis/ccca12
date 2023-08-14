import React, { PropsWithChildren, useContext } from "react";
import { Container, interfaces } from "inversify";

const InversifyContext = React.createContext<{ container: Container | null }>({
  container: null,
});

type Props = PropsWithChildren & {
  container: Container;
};

export const Provider: React.FC<Props> = (props: Props) => {
  return (
    <InversifyContext.Provider value={{ container: props.container }}>
      {props.children}
    </InversifyContext.Provider>
  );
};

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const { container } = useContext(InversifyContext);
  if (!container) {
    throw new Error();
  }
  return container.get<T>(identifier);
}
