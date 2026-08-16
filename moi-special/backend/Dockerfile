# STAGE 1: Build .NET 8 Application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["MoiSpecial.Api/MoiSpecial.Api.csproj", "MoiSpecial.Api/"]
RUN dotnet restore "MoiSpecial.Api/MoiSpecial.Api.csproj"

# Copy source code and build Release bundle
COPY . .
WORKDIR "/src/MoiSpecial.Api"
RUN dotnet build "MoiSpecial.Api.csproj" -c Release -o /app/build
RUN dotnet publish "MoiSpecial.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# STAGE 2: ASP.NET 8 Runtime Image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MoiSpecial.Api.dll"]
