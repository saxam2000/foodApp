module.exports.createElement = function (ElementModel) {
    return async function (req, res) {
        try {
            let element = req.body;
            if (element) {
                element = await ElementModel.create(element);
                res.status(200).json({
                    elementP
                });
            } else {
                res.status(200).json({
                    message: "kindly enter  data"
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Server error"
            });
        }
    }
}
module.exports.getElements = function (ElementModel) {
    return async function (req, res) {
        try {
            // console.log(req.query);
            // sort,
            // sort
            // sort
            // paginate
            let Query=req.query;
            let promise=await ElementModel.find();
            if(Query.myquery){

                let ans = JSON.parse(req.query.myquery);
                console.log("ans", ans);
                let ElementsQuery = ElementModel.find(ans);
                promise=ElementsQuery;
            }
            if(Query.sort){

                let sortField = req.query.sort;
                let sortQuery = ElementsQuery.sort(`-${sortField}`);
                promise=sortQuery;
            }
            if(Query.select){

                let params = req.query.select.split("%").join(" ");
                let filteredQuery = sortQuery
                .select(`${params} -_id`);
                promise=filteredQuery;
            }
            if(Query.limit&&Query.page){

                let page = Number(req.query.page) || 1;
                let limit = Number(req.query.limit) || 3;
                let toSkip = (page - 1) * limit;
                let paginatedResultPromise = filteredQuery
                    .skip(toSkip)
                    .limit(limit);
                    promise=paginatedResultPromise;
            }
           
            let result = await promise;
            // ElementModel.sort().select()
            
            //
            console.log(result); 
            res.status(200).json({
                "message": "list of all the Elements",
                Elements: result
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: err.message,
                "message": "can't get Elements"
            })
        }
    }
}
module.exports.updateElement = function (ElementModel) {
    return async function updateElement(req, res) {
        let { id } = req.body;
        try {
            let element = await ElementModel.findbyId(id);
            if (element) {
                delete req.body.id
                for (let key in req.body) {
                    element[key] = req.body[key];
                }
                await element.save();
                res.status(200).json(element);
            } else {
                res.status(404).json({
                    message: "resource not found"
                })
            }
            // await ElementModel.findByIdAndUpdate({ _id: id }, req.body,{runValidators:true});
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Server error"
            });
        }
        // email send to
        // nodemailer -> table tag through
        //  service -> gmail
    }
}
module.exports.deleteElement = function (ElementModel) {
    return async function deletePlan(req, res) {
        let { id } = req.body;
        try {
            let element = await ElementModel.finByIdAndDelete(id, req.body);
            // let element = await ElementModel.findOne({ _id: id });
            if (!element) {
                res.status(404).json({
                    message: "resource not found"
                })
            } else {
                res.status(200).json(element);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Server error"
            });

        }
    }

}
module.exports.getElementById = function (ElementModel) {
    return async function getElementById(req, res) {
        try {
            let id = req.params.id;
            let element = await ElementModel.getElementById(id);

            res.status(200).json({
                element: element
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Server error",
            });
        }

    }
}