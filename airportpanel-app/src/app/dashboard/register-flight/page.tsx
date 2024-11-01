"use client"; // 👉🏼 Render this componet on client side only.
import {
  Building2Icon,
  DoorClosedIcon,
  LocateFixedIcon,
  MapPinIcon,
  PlaneIcon,
  PlaneLandingIcon,
  PlaneTakeoffIcon,
  TowerControlIcon,
  TrendingUpIcon,
} from "lucide-react";
import Link from "next/link";
import Select from "react-select";
import ReactDatePicker from "react-datepicker";
import { CustomStyles } from "@/assets/styles/react-select";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { IsUserAuthenticatedAtom } from "@/contexts";
import { useEffect, useState } from "react";
import { getToken, getUsername, isJwtValid } from "@/configs";
import { useQuery } from "react-query";
import { getAirports, getCompanies } from "@/services/get";
import { AirportsAtom } from "@/contexts/airports";
import { CompaniesAtom } from "@/contexts/companies";
import { FlightDataType, FlightStatus } from "@/services/models/post";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { newFlight } from "@/services/post";
import "./styles/registerFlight.css";

export default function RegisterFlight() {
  const [originAirport, setOriginAirport] = useState<null | string>(null);

  const router = useRouter();
  const [isUserAuthorized, setIsUserAuthorized] = useAtom(
    IsUserAuthenticatedAtom
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FlightDataType>();

  const onSubmit: SubmitHandler<FlightDataType> = async (data) => {
    if (originAirport) {
      data.origin = originAirport;
    }

    const response = await newFlight(data);

    if (response.statusCode === 201) {
      router.push("/");
    }
  };

  useEffect(() => {
    Promise.resolve().then(async () => {
      if (!(await isJwtValid(getToken()))) {
        router.push("/sign-in");
        return;
      }

      setIsUserAuthorized(true);
      return;
    });
  }, []);

  const [airports, setAirports] = useAtom(AirportsAtom);
  const {
    data: airportsData,
    status: statusAirports,
    isLoading: isLoadingAirports,
  } = useQuery("airports", () => getAirports(airports));

  if (statusAirports === "success" && airportsData.length > 0) {
    setAirports(airportsData);
  }

  const [companies, setCompanies] = useAtom(CompaniesAtom);
  const {
    data: companiesData,
    status: statusCompanies,
    isLoading: isLoadingCompanies,
  } = useQuery("companies", () => getCompanies(companies));

  if (statusCompanies === "success" && companiesData.length > 0) {
    setCompanies(companiesData);
  }

  if (!isUserAuthorized) {
    return (
      <main className="main__container bg-white h-screen">
        <h1>Carregando...</h1>
      </main>
    );
  }

  return (
    <main className="main__container register__flight__bg">
      <div className="box__flight__register__content">
        <div className="painel__register__flight">
          <h1 className="title">Olá! {getUsername()}</h1>
          <p className="text lg:px-2 lg:w-3/4 text-white text-center">
            Veja os voos de hoje.
          </p>
          <div className="w-2/4 mt-8">
            <Link
              href="/"
              className="button__default__outline w-full inline-block"
            >
              Ver voos
            </Link>
          </div>
        </div>
        <div className="register__flight__inputs">
          <h1 className="title fade__text">Registar Voo</h1>
          <p className="text text-black lg:w-1/2 w-full text-center mb-4">
            Registre um voo na plataforma para que ele apareça no painel.
          </p>
          <form
            className="form__register__flight"
            onSubmit={handleSubmit(onSubmit)}
            method="post"
          >
            <div className="input">
              <div className="input__icon__default">
                <PlaneIcon size={24} color="#FF8E00" />
              </div>
              <input
                placeholder="Número do voo"
                className="input__default"
                type="text"
                id="flight-number"
                {...register("flightNumber", { required: true })}
              />
            </div>
            <div className="input">
              <div className="input__icon__default">
                <MapPinIcon size={24} color="#FF8E00" />
              </div>
              <Select
                id="origin"
                placeholder="Origem"
                name="origin"
                className="w-full"
                noOptionsMessage={() => "Nenhuma opção"}
                isLoading={false}
                styles={CustomStyles()}
                options={airports.map((airport) => ({
                  value: airport.airportAcronym,
                  label: `${airport.airportAcronym} - ${airport.airport}`,
                  color: "#FF8B00",
                }))}
                onChange={(e) => setOriginAirport(e?.value || null)}
              />
            </div>
            <div className="input">
              <div className="input__icon__default">
                <LocateFixedIcon size={24} color="#FF8E00" />
              </div>
              <Controller
                control={control}
                name="destination"
                rules={{
                  required: { value: true, message: "Campo obrigatório" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    id="destination"
                    name="destination"
                    placeholder="Destino"
                    className="w-full"
                    closeMenuOnSelect={true}
                    noOptionsMessage={() => "Nenhuma opção"}
                    isLoading={false}
                    styles={CustomStyles()}
                    options={airports
                      .filter((e) => e.airportAcronym !== originAirport)
                      .map((airport) => ({
                        value: airport.airportAcronym,
                        label: `${airport.airportAcronym} - ${airport.airport}`,
                        color: "#FF8B00",
                      }))}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
            </div>
            <div className="input">
              <div className="input__icon__default">
                <Building2Icon size={24} color="#FF8E00" />
              </div>
              <Controller
                control={control}
                name="companyId"
                rules={{
                  required: { value: true, message: "Campo obrigatório" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    id="company"
                    name="companyId"
                    placeholder="Compania"
                    className="w-full"
                    noOptionsMessage={() => "Nenhuma opção"}
                    isLoading={false}
                    styles={CustomStyles()}
                    closeMenuOnSelect={true}
                    onChange={(e) => onChange(e?.value)}
                    options={companies.map((company) => ({
                      value: company._id,
                      label: `${company.name}`,
                      color: "#FF8B00",
                    }))}
                  />
                )}
              />
            </div>
            <div className="input">
              <div className="input__icon__default">
                <PlaneTakeoffIcon size={24} color="#FF8E00" />
              </div>
              <Controller
                control={control}
                name="departureDate"
                rules={{
                  required: { value: true, message: "Campo obrigatório" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ReactDatePicker
                    selected={value ? new Date(value) : null}
                    className="input__default"
                    placeholderText="Data de partida"
                    onChange={(e) => onChange(e || new Date())}
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="dd/MM/yyyy HH:mm"
                    minDate={new Date()}
                    timeIntervals={10}
                    name="departure-date"
                    id="departure-date"
                  />
                )}
              />
            </div>
            <div className="input">
              <div className="input__icon__default">
                <PlaneLandingIcon size={24} color="#FF8E00" />
              </div>
              <Controller
                control={control}
                name="arrivalDate"
                rules={{
                  required: { value: true, message: "Campo obrigatório" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ReactDatePicker
                    selected={value ? new Date(value) : null}
                    className="input__default"
                    placeholderText="Data de chegada"
                    onChange={(e) => onChange(e || new Date())}
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="dd/MM/yyyy HH:mm"
                    minDate={new Date()}
                    timeIntervals={10}
                    name="arrival-date"
                    id="arrival-date"
                  />
                )}
              />
            </div>
            <div className="input">
              <div className="input__icon__default">
                <TrendingUpIcon size={24} color="#FF8E00" />
              </div>
              <Controller
                control={control}
                name="status"
                rules={{
                  required: { value: true, message: "Campo obrigatório" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    id="flight-status"
                    name="flight-status"
                    placeholder="Status do voo"
                    className="w-full"
                    noOptionsMessage={() => "Nenhuma opção"}
                    isLoading={false}
                    styles={CustomStyles()}
                    options={FlightStatus}
                    closeMenuOnSelect={true}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
            </div>
            <div className="input">
              <div className="input__icon__default">
                <TowerControlIcon size={24} color="#FF8E00" />
              </div>
              <Controller
                control={control}
                name="terminal"
                rules={{
                  required: { value: true, message: "Campo obrigatório" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    id="airport-terminal"
                    name="airport-terminal"
                    placeholder="Terminal"
                    className="w-full"
                    noOptionsMessage={() => "Nenhuma opção"}
                    isLoading={false}
                    closeMenuOnSelect={true}
                    styles={CustomStyles()}
                    options={
                      airports
                        .filter((e) => e.airportAcronym === originAirport)[0]
                        ?.terminals.map((terminal) => ({
                          value: terminal,
                          label: terminal,
                          color: "#FF8B00",
                        })) || []
                    }
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
            </div>
            <div className="input">
              <div className="input__icon__default">
                <DoorClosedIcon size={24} color="#FF8E00" />
              </div>
              <Controller
                control={control}
                name="gate"
                rules={{
                  required: { value: true, message: "Campo obrigatório" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    id="airport-gate"
                    name="airport-gate"
                    placeholder="Portão"
                    className="w-full"
                    noOptionsMessage={() => "Nenhuma opção"}
                    isLoading={false}
                    styles={CustomStyles()}
                    closeMenuOnSelect={true}
                    onChange={(e) => onChange(e?.value)}
                    options={
                      airports
                        .filter((e) => e.airportAcronym === originAirport)[0]
                        ?.gates.map((terminal) => ({
                          value: terminal,
                          label: terminal,
                          color: "#FF8B00",
                        })) || []
                    }
                  />
                )}
              />
            </div>
            <button className="button__default">Salvar!</button>
          </form>
          <p className="text-black lg:hidden flex mt-2 mb-2 text-center ">ou</p>
          <div className="lg:hidden flex w-full">
            <Link href="/" className="button__default">
              Ver voos
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
