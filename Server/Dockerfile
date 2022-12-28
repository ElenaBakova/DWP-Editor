FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

WORKDIR /app

COPY ./Python-script/ /app/Python-script/
RUN apt-get update -y
RUN apt-get install -y python3-pip
RUN pip3 install --upgrade pip
RUN pip3 install -r /app/Python-script/requirements.txt

EXPOSE 5098

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["./Server.csproj", "."]
RUN dotnet restore "./Server.csproj"
COPY . .

WORKDIR "/src/."
RUN dotnet build "Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Server.dll"]