"use client";
import "./home/style/home.css";
import { formatDateToHoursAndMinutes } from "./utils";
import { getFlights } from "@/services/get";
import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { flightsAtom } from "@/contexts/flights";
import Image from "next/image";
import { FlightStatus, eFlightStatus } from "@/services/models/post";
import { useEffect } from "react";
import { isUserAdmin } from "@/configs";
import Select from "react-select";
import { CustomStyles } from "@/assets/styles/react-select";
import { patchFlightStatus } from "@/services/patch";

export default function Home() {
  const [flights, setFlights] = useAtom(flightsAtom);
  const {
    data,
    isLoading: isLoadingFlights,
    status,
  } = useQuery("flights", () => getFlights(), {
    refetchInterval: 1000 * 60 * 2, // 2 minutes
  });

  useEffect(() => {
    if (status === "success") {
      setFlights(data);
    }
  }, [data, status, isLoadingFlights]);

  // Fazer sistema de atualizar status do voo, pode ser só pra admin

  // Depois disso é só cadastrar mais companhias aereas e aeroportos
  // Depois cadastrar mais voos

  const changeFlightStatus = async (flightId: string, status: string) => {
    const response = await patchFlightStatus(flightId, status);

    if (response) {
      const flightIndex = flights.findIndex(
        (flight) => flight._id === flightId
      );

      const newFlights = [...flights];
      newFlights[flightIndex].status = status as eFlightStatus;
      setFlights(newFlights);
    }
  };

  console.log(isUserAdmin());

  return (
    <main className="main__container bg-gradient-to-r from-[#FF8E00] to-[#FF5003]">
      <div className="painel__container">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 z-10">
            <div className="inline-block min-w-full pt-4">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="th__flights__table">
                        Hora da partida
                      </th>
                      <th scope="col" className="th__flights__table">
                        Número do voo
                      </th>
                      <th scope="col" className="th__flights__table">
                        Companhia aerea
                      </th>
                      <th scope="col" className="th__flights__table">
                        Origem
                      </th>
                      <th scope="col" className="th__flights__table">
                        Destino
                      </th>
                      <th scope="col" className="th__flights__table">
                        Portão
                      </th>
                      <th scope="col" className="th__flights__table">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {flights.map((flight) => {
                      const statusFlight = FlightStatus.filter(
                        (e) => e.value === flight.status
                      )[0];

                      return (
                        <tr
                          key={flight.flightNumber}
                          className="border-b transition duration-300 hover:rounded-xl ease-in-out hover:bg-gradient-to-r from-[#FF8E00] to-[#FF5003] hover:text-white z-10"
                        >
                          <td className="td__flights__table font-medium">
                            {formatDateToHoursAndMinutes(
                              new Date(flight.departureDate)
                            )}
                          </td>
                          <td className="td__flights__table">
                            {flight.flightNumber}
                          </td>
                          <td className="td__flights__table">
                            <Image
                              src={flight.companyId.logo}
                              alt="Airplane"
                              width={200}
                              height={200}
                              className=" w-28 object-contain h-16"
                            />
                          </td>
                          <td className="td__flights__table">
                            {flight.origin}
                          </td>
                          <td className="td__flights__table">
                            {flight.destination}
                          </td>
                          <td className="td__flights__table">{flight.gate}</td>
                          <td className="td__flights__table flex items-center gap-2">
                            <span
                              data-tooltip-target="tooltip-default"
                              className="relative flex h-3 w-3"
                            >
                              <span
                                className={` animate-ping absolute inline-flex h-full w-full rounded-full ${
                                  isLoadingFlights
                                    ? "bg-yellow-400"
                                    : statusFlight.color === "green"
                                    ? "bg-green-400"
                                    : statusFlight.color === "red"
                                    ? "bg-red-400"
                                    : statusFlight.color === "yellow"
                                    ? "bg-yellow-400"
                                    : statusFlight.color === "blue"
                                    ? "bg-blue-400"
                                    : statusFlight.color === "gray"
                                    ? "bg-gray-400"
                                    : "bg-green-400"
                                } opacity-75`}
                              ></span>
                              <span
                                className={`relative inline-flex rounded-full h-3 w-3 ${
                                  isLoadingFlights
                                    ? "bg-yellow-500"
                                    : statusFlight.color === "green"
                                    ? "bg-green-400"
                                    : statusFlight.color === "red"
                                    ? "bg-red-400"
                                    : statusFlight.color === "yellow"
                                    ? "bg-yellow-400"
                                    : statusFlight.color === "blue"
                                    ? "bg-blue-400"
                                    : statusFlight.color === "gray"
                                    ? "bg-gray-400"
                                    : "bg-green-400"
                                }`}
                              ></span>
                            </span>
                            {!isUserAdmin() ? (
                              <p>{statusFlight.label}</p>
                            ) : (
                              <Select
                                id="flight-status"
                                name="flight-status"
                                placeholder="Status do voo"
                                className="w-full"
                                noOptionsMessage={() => "Nenhuma opção"}
                                isLoading={false}
                                value={statusFlight}
                                styles={CustomStyles()}
                                options={FlightStatus}
                                closeMenuOnSelect={true}
                                onChange={(e) =>
                                  changeFlightStatus(
                                    flight._id,
                                    e?.value as string
                                  )
                                }
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
