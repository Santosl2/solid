import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDataProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";


container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)