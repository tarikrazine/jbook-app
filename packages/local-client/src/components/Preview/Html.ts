export const htmlCode: string = `
<html>
    <head>
        <style>
            html {
                background-color: whitesmoke;
            }
        </style>
    </head>
    <body>
        <div id='root'></div>
        <script>

            // Handle Error Function
            const handleError = (err) => {
                const rootEl = document.querySelector('#root')

                rootEl.innerHTML = '<div style="color: red;"><h4>RUNTIME Error</h4>' + err + '</div>'

                console.error(err)
            } 

            // Catch error listener 
            window.addEventListener('error', (event) => {
                event.preventDefault()

                handleError(event.error)
            })

            // Catch message listener
            window.addEventListener('message', (event) => {

            try {

                eval(event.data)

                } catch (err) {

                    handleError(err)

                }

            })
        </script>
    </body>
</html>
`;
