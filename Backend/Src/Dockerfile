FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

WORKDIR /intercab

EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ["Intercab.csproj", "."]

RUN dotnet restore "./Intercab.csproj"

COPY . .

WORKDIR "/src/."

RUN dotnet build "./Intercab.csproj" -c Release -o /intercab/build

FROM build AS publish

RUN dotnet publish "./Intercab.csproj" -c Release -o /intercab/publish /p:UseAppHost=false

FROM base AS final

WORKDIR /intercab

COPY --from=publish /intercab/publish .

ENTRYPOINT ["dotnet", "Intercab.dll"]