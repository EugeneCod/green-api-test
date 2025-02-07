function App() {
  return (
    <div className="bg-primary-bg">
      {/* register page */}
      <div className={`fixed inset-0 flex justify-center items-center`}>
        <div className="w-100 bg-secondary-bg rounded-md p-8">
          <h1 className=" text-2xl font-bold">
            Регистрация
          </h1>
          <p className="">
            Введите свои учетные данные из системы GREEN-API
          </p>
          <div>
            <label htmlFor="idInstance">idInstance</label>
            <input placeholder="idInstance" />
          </div>
          <div>
            <label htmlFor="apiTokenInstance">apiTokenInstance</label>
            <input placeholder="apiTokenInstance" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
